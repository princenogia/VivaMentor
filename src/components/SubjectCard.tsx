"use client";

import Link from "next/link";

interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export default function SubjectCard({
  id,
  name,
  icon,
  color,
}: SubjectCardProps) {
  return (
    <Link href={`/tutor?subject=${id}`} className="subject-card group">
      <div className={`subject-icon bg-gradient-to-br ${color}`}>{icon}</div>
      <span className="subject-name">{name}</span>
    </Link>
  );
}
