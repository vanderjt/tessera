'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FormEvent, use, useMemo, useState } from 'react';

interface PageProps {
  params: Promise<{
    mosaicId: string;
  }>;
}

export default function ShareMomentPage({ params }: PageProps) {
  const { mosaicId } = use(params);
  const [reflection, setReflection] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const canPlaceTessera = useMemo(() => reflection.trim().length > 0, [reflection]);

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPhotoPreview(null);
      setPhotoName(null);
      return;
    }

    setPhotoName(file.name);
    const reader = new FileReader();

    reader.onload = () => {
      setPhotoPreview(typeof reader.result === 'string' ? reader.result : null);
    };

    reader.readAsDataURL(file);
  };

  const handlePlaceTessera = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
      <form
        onSubmit={handlePlaceTessera}
        className="relative mt-4 overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-stone-100/95 via-stone-100/90 to-stone-200/85 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-30px_60px_-40px_rgba(68,64,60,0.6),0_30px_50px_-38px_rgba(41,37,36,0.85)] ring-1 ring-stone-300/60 sm:p-10"
      >
        <div className="pointer-events-none absolute inset-x-6 top-4 h-20 rounded-full bg-white/35 blur-3xl sm:inset-x-20" />
        <div className="relative space-y-8">
          <header className="space-y-3 border-b border-stone-300/55 pb-7">
            <p className="page-kicker">Add a tessera</p>
            <h1 className="page-title">Add a tessera</h1>
            <p className="page-body max-w-2xl text-stone-700/95">
              Set this moment on the bench and shape it with words first. Add a photo only if it deepens what you want to
              remember.
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500/95">Mosaic chapter • {mosaicId}</p>
          </header>

          <div className="space-y-4">
            <p className="text-base font-medium text-stone-800">What would you like this tessera to hold?</p>

            <div className="rounded-[1.9rem] bg-stone-50/95 p-5 shadow-[0_18px_28px_-26px_rgba(41,37,36,0.9),0_3px_0_0_rgba(255,255,255,0.8)] ring-1 ring-stone-200/75 sm:p-7">
              <textarea
                id="reflection"
                value={reflection}
                onChange={(event) => setReflection(event.target.value)}
                placeholder="Begin with the part of this moment you most want to keep."
                rows={8}
                className="w-full resize-none border-0 bg-transparent p-0 text-base leading-relaxed text-stone-800 outline-none placeholder:text-stone-500/80"
              />
            </div>

            <p className="text-sm leading-relaxed text-stone-600/95">
              Stay with the feeling for a moment. Let the reflection carry the memory before anything else.
            </p>
          </div>

          <div className="space-y-5 border-t border-stone-300/55 pt-6">
            <div className="space-y-3">
              <label htmlFor="photo" className="block text-sm font-medium text-stone-700/95">
                Optional photo tool
              </label>

              <div className="rounded-2xl bg-stone-50/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] ring-1 ring-stone-200/70">
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
                <label
                  htmlFor="photo"
                  className="inline-flex cursor-pointer items-center rounded-full bg-stone-200/80 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-300/80"
                >
                  Choose photo
                </label>
                {photoName ? <p className="mt-3 text-xs text-stone-500/95">Set on the bench: {photoName}</p> : null}
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Selected moment preview"
                    width={960}
                    height={640}
                    unoptimized
                    className="mt-4 max-h-64 w-full rounded-xl object-cover ring-1 ring-stone-300/70"
                  />
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href={`/mosaics/${mosaicId}`}
                className="rounded-full border border-stone-300/85 px-4 py-2 text-sm text-stone-700 transition hover:border-stone-400 hover:text-stone-900"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={!canPlaceTessera}
                className="rounded-full bg-stone-900 px-5 py-2 text-sm text-stone-100 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-100"
              >
                Place tessera
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
