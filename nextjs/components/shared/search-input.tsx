"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export function SearchInput({ placeholder = "搜索...", className = "" }: SearchInputProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/40 focus:bg-surface-hover transition-all"
      />
    </form>
  );
}
