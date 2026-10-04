"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Course } from "@/types/course";

export type CourseDraft = {
  code: string;
  name: string;
  credit: string;
  instructor: string;
};

const emptyDraft: CourseDraft = {
  code: "",
  name: "",
  credit: "",
  instructor: "",
};

type FormErrors = Partial<Record<keyof CourseDraft, string>>;

type CourseFormProps = {
  initialCourse?: Course;
  onSave: (draft: CourseDraft) => void;
  onCancel: () => void;
};

function toDraft(course?: Course): CourseDraft {
  if (!course) return emptyDraft;
  return {
    code: course.code,
    name: course.name,
    credit: String(course.credit),
    instructor: course.instructor,
  };
}

function validate(value: CourseDraft): FormErrors {
  const nextErrors: FormErrors = {};
  if (value.code.trim() === "") nextErrors.code = "กรุณาระบุรหัสวิชา";
  if (value.name.trim() === "") nextErrors.name = "กรุณาระบุชื่อวิชา";
  const credit = Number(value.credit);
  if (!Number.isInteger(credit) || credit < 1 || credit > 6) {
    nextErrors.credit = "หน่วยกิตต้องเป็นจำนวนเต็มตั้งแต่ 1 ถึง 6";
  }
  return nextErrors;
}

export default function CourseForm({
  initialCourse,
  onSave,
  onCancel,
}: CourseFormProps) {
  const [draft, setDraft] = useState<CourseDraft>(toDraft(initialCourse));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    marginTop: "6px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#94a3b8",
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      style={{
        backgroundColor: "#1e293b",
        padding: "24px",
        borderRadius: "14px",
        border: "1px solid #334155",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.3)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h3 style={{ margin: "0 0 4px 0", color: "#f8fafc", fontSize: "18px" }}>
        {initialCourse ? "✏️ แก้ไขรายวิชา" : "➕ เพิ่มรายวิชาใหม่"}
      </h3>

      <div>
        <label htmlFor="code" style={labelStyle}>รหัสวิชา</label>
        <input
          id="code"
          name="code"
          type="text"
          placeholder="เช่น CS101"
          value={draft.code}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.code ? "#ef4444" : "#334155",
          }}
          aria-invalid={!!errors.code}
        />
        {errors.code && <p style={{ color: "#f87171", fontSize: "12px", margin: "4px 0 0" }}>{errors.code}</p>}
      </div>

      <div>
        <label htmlFor="name" style={labelStyle}>ชื่อวิชา</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="ชื่อรายวิชา"
          value={draft.name}
          onChange={handleChange}
          style={{
            ...inputStyle,
            borderColor: errors.name ? "#ef4444" : "#334155",
          }}
          aria-invalid={!!errors.name}
        />
        {errors.name && <p style={{ color: "#f87171", fontSize: "12px", margin: "4px 0 0" }}>{errors.name}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div>
          <label htmlFor="credit" style={labelStyle}>หน่วยกิต</label>
          <input
            id="credit"
            name="credit"
            type="number"
            inputMode="numeric"
            min="1"
            max="6"
            value={draft.credit}
            onChange={handleChange}
            style={{
              ...inputStyle,
              borderColor: errors.credit ? "#ef4444" : "#334155",
            }}
            aria-invalid={!!errors.credit}
          />
          {errors.credit && <p style={{ color: "#f87171", fontSize: "12px", margin: "4px 0 0" }}>{errors.credit}</p>}
        </div>

        <div>
          <label htmlFor="instructor" style={labelStyle}>ผู้สอน</label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            placeholder="ชื่ออาจารย์ผู้สอน"
            value={draft.instructor}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <button
          type="submit"
          style={{
            flex: 1,
            padding: "10px 16px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          {initialCourse ? "บันทึกการแก้ไข" : "บันทึกรายวิชา"}
        </button>

        {initialCourse && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 16px",
              backgroundColor: "#475569",
              color: "#f8fafc",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}