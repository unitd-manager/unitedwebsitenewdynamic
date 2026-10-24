import { ChangeEvent, useState } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import { uploadAdminMedia } from "@/lib/cmsApi";

type ContentValue = Record<string, unknown>;
type ContentPath = Array<string | number>;

type ContentFieldsProps = {
  value: ContentValue;
  onChange: (value: ContentValue) => void;
  contentType: string;
};

const fieldClass = "admin-field-input";
const cardClass = "admin-field-card";

function labelFor(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function setAtPath(
  current: unknown,
  path: ContentPath,
  nextValue: unknown,
): unknown {
  if (path.length === 0) return nextValue;
  const [segment, ...remaining] = path;

  if (Array.isArray(current)) {
    const result = [...current];
    const index = Number(segment);
    result[index] = setAtPath(result[index], remaining, nextValue);
    return result;
  }

  const source =
    current && typeof current === "object"
      ? (current as Record<string, unknown>)
      : {};
  return {
    ...source,
    [String(segment)]: setAtPath(source[String(segment)], remaining, nextValue),
  };
}

function getDefaultArrayItem(path: ContentPath, contentType: string): unknown {
  const key = String(path[path.length - 1] || "").toLowerCase();
  if (key === "stats") return { value: "", label: "" };
  if (key === "faqs") return { question: "", answer: "" };
  if (key === "links" && contentType === "navigation") {
    return { label: "", href: "", type: "route" };
  }
  if (key === "content" && contentType === "blog") {
    return { type: "paragraph", text: "" };
  }
  if (key === "sections" || key === "features") return { title: "", description: "" };
  if (key === "images") return "";
  if (key === "children") return { label: "", href: "" };

  const firstItem = path.reduce<unknown>((value, part) => {
    if (Array.isArray(value)) return value[Number(part)];
    if (value && typeof value === "object") {
      return (value as Record<string, unknown>)[String(part)];
    }
    return undefined;
  }, undefined);
  if (firstItem && typeof firstItem === "object" && !Array.isArray(firstItem)) {
    return Object.fromEntries(
      Object.keys(firstItem as Record<string, unknown>).map((field) => [field, ""]),
    );
  }
  return "";
}

function isLongText(key: string, value: string) {
  return (
    value.length > 100 ||
    /description|review|message|body|text|summary|content|subtitle|paragraph/i.test(key)
  );
}

function FieldValue({
  name,
  value,
  path,
  contentType,
  textareaPaths,
  onChange,
}: {
  name: string;
  value: unknown;
  path: ContentPath;
  contentType: string;
  textareaPaths: Set<string>;
  onChange: (path: ContentPath, value: unknown) => void;
}) {
  const pathKey = path.join(".");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  if (Array.isArray(value)) {
    return (
      <fieldset className={cardClass}>
        <div className="admin-field-array-heading">
          <legend>{labelFor(name)}</legend>
          <button
            type="button"
            onClick={() => onChange(path, [...value, getDefaultArrayItem(path, contentType)])}
            className="admin-field-add"
          >
            <Plus size={15} /> Add {labelFor(name).replace(/s$/, "")}
          </button>
        </div>
        {value.length === 0 && (
          <p className="admin-field-empty">No items added yet.</p>
        )}
        <div className="admin-field-group">
          {value.map((item, index) => {
            const itemPath = [...path, index];
            return (
              <div key={index} className={cardClass}>
                <div className="admin-field-item-heading">
                  <p>
                    {labelFor(name).replace(/s$/, "")} {index + 1}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${labelFor(name).replace(/s$/, "")} ${index + 1}`}
                    onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                    className="admin-field-remove"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                {item && typeof item === "object" && !Array.isArray(item) ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Object.entries(item as Record<string, unknown>).map(([childName, childValue]) => (
                      <FieldValue
                        key={childName}
                        name={childName}
                        value={childValue}
                        path={[...itemPath, childName]}
                        contentType={contentType}
                        textareaPaths={textareaPaths}
                        onChange={onChange}
                      />
                    ))}
                    {Object.keys(item as Record<string, unknown>).length === 0 && (
                      <p className="admin-field-empty">No fields available for this item.</p>
                    )}
                  </div>
                ) : (
                  <FieldValue
                    name={name.replace(/s$/, "")}
                    value={item}
                    path={itemPath}
                    contentType={contentType}
                    textareaPaths={textareaPaths}
                    onChange={onChange}
                  />
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (value && typeof value === "object") {
    return (
      <fieldset className={`${cardClass} admin-field-group`}>
        <legend>{labelFor(name)}</legend>
        {Object.entries(value as Record<string, unknown>).map(([childName, childValue]) => (
          <FieldValue
            key={childName}
            name={childName}
            value={childValue}
            path={[...path, childName]}
            contentType={contentType}
            textareaPaths={textareaPaths}
            onChange={onChange}
          />
        ))}
      </fieldset>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="admin-field-boolean">
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(path, event.target.checked)}
        />
        {labelFor(name)}
      </label>
    );
  }

  const stringValue = value == null ? "" : String(value);
  const isImageField = /image|logo|icon|avatar|photo|src/i.test(name);
  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      const uploaded = await uploadAdminMedia(file);
      onChange(path, uploaded.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Image upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };
  return (
    <label className="admin-field-label">
      {labelFor(name)}
      {textareaPaths.has(pathKey) || isLongText(name, stringValue) ? (
        <textarea
          rows={4}
          value={stringValue}
          onChange={(event) => onChange(path, event.target.value)}
          className={fieldClass}
        />
      ) : (
        <input
          type={typeof value === "number" ? "number" : "text"}
          step={typeof value === "number" ? "any" : undefined}
          value={stringValue}
          onChange={(event) =>
            onChange(
              path,
              typeof value === "number" && event.target.value !== ""
                ? Number(event.target.value)
                : event.target.value,
            )
          }
          className={fieldClass}
        />
      )}
      {isImageField && (
        <span className="admin-field-upload">
          <input
            type="file"
            accept="image/avif,image/gif,image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            disabled={uploading}
            aria-label={`Upload ${labelFor(name)}`}
          />
          {uploading && <span className="admin-field-empty">Uploading image...</span>}
          {uploadError && <span role="alert" className="admin-field-error">{uploadError}</span>}
        </span>
      )}
    </label>
  );
}

export default function ContentFields({
  value,
  onChange,
  contentType,
}: ContentFieldsProps) {
  const [newFieldName, setNewFieldName] = useState("");
  const [newFieldType, setNewFieldType] = useState("text");
  const [textareaPaths, setTextareaPaths] = useState<Set<string>>(new Set());
  const update = (path: ContentPath, nextValue: unknown) => {
    onChange(setAtPath(value, path, nextValue) as ContentValue);
  };

  return (
    <div className="space-y-4">
      {Object.entries(value).map(([name, fieldValue]) => (
        <FieldValue
          key={name}
          name={name}
          value={fieldValue}
          path={[name]}
          contentType={contentType}
          textareaPaths={textareaPaths}
          onChange={update}
        />
      ))}
      <div className="admin-add-field-panel">
        <p>Add a content field</p>
        <div className="admin-add-field-row">
          <input
            value={newFieldName}
            onChange={(event) => setNewFieldName(event.target.value)}
            placeholder="Field name"
            aria-label="New content field name"
            className="admin-input"
          />
          <select
            value={newFieldType}
            onChange={(event) => setNewFieldType(event.target.value)}
            aria-label="New content field type"
            className="admin-input"
          >
            <option value="text">Text</option>
            <option value="textarea">Textarea</option>
            <option value="repeater">Repeatable group</option>
          </select>
          <button
            type="button"
            disabled={
              !newFieldName.trim() ||
              Object.prototype.hasOwnProperty.call(value, newFieldName.trim())
            }
            onClick={() => {
              const name = newFieldName.trim();
              const initialValue =
                newFieldType === "repeater"
                  ? []
                  : "";
              onChange({ ...value, [name]: initialValue });
              if (newFieldType === "textarea") {
                setTextareaPaths((current) => new Set(current).add(name));
              }
              setNewFieldName("");
              setNewFieldType("text");
            }}
            className="admin-button admin-button-primary"
          >
            <Plus size={15} /> Add field
          </button>
        </div>
        {Object.keys(value).length === 0 && (
          <p className="admin-add-field-note">
            This item has no fields yet. Add text, textarea, or repeatable fields here.
          </p>
        )}
      </div>
    </div>
  );
}
