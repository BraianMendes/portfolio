"use client";
import { Link } from "@heroui/link";

export function Footer() {
    return (
        <footer className="w-full border-t border-neutral-800 py-6 flex flex-col items-center justify-center text-xs text-gray-500 mt-36">
            <span>
                Created by{" "}
                <Link
                    isExternal
                    href="https://github.com/BraianMendes"
                    className="text-primary-400 hover:underline underline-offset-2 transition"
                >
                    @BraianMendes
                </Link>
                {" • "}© {new Date().getFullYear()}
            </span>
        </footer>
    );
}
