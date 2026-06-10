import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <FileQuestion size={64} className="text-text-muted mb-6" />
      <h1 className="text-4xl font-bold text-text-primary mb-2">404</h1>
      <p className="text-text-secondary mb-8">页面不存在</p>
      <Link href="/" className="pill pill-active px-6 py-2.5 text-sm">
        返回首页
      </Link>
    </div>
  );
}
