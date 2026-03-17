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
        className="relative mt-4 overflow-hidden rounded-[0.9rem] border border-stone-300/80 bg-gradient-to-b from-stone-100/80 to-stone-200/75 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-1px_0_rgba(120,113,108,0.18),0_4px_10px_-8px_rgba(28,25,23,0.6)] sm:p-8"
      >
        <div className="relative space-y-7">
          <header className="space-y-3">
            <p className="page-kicker">Add a tessera</p>
            <h1 className="page-title">Add a tessera</h1>
            <p className="page-body max-w-2xl text-stone-700/95">
              Set this moment on the bench and shape it with words first. Add a photo only if it deepens what you want to
              remember.
            </p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500/95">Mosaic chapter • {mosaicId}</p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start lg:gap-5">
            <div className="space-y-4">
              <p className="text-base font-medium text-stone-800">What would you like this tessera to hold?</p>

              <div className="rounded-[0.7rem] border border-stone-300/85 bg-stone-50/95 p-5 shadow-[0_5px_12px_-10px_rgba(41,37,36,0.7),0_1px_0_rgba(255,255,255,0.7)] sm:p-7">
                <textarea
                  id="reflection"
                  value={reflection}
                  onChange={(event) => setReflection(event.target.value)}
                  placeholder="Begin with the part of this moment you most want to keep."
                  rows={10}
                  className="w-full resize-none border-0 bg-transparent p-0 text-base leading-relaxed text-stone-800 outline-none placeholder:text-stone-500/80"
                />
              </div>

              <p className="text-sm leading-relaxed text-stone-600/95">
                Stay with the feeling for a moment. Let the reflection carry the memory before anything else.
              </p>
            </div>

            <aside className="border-stone-300/75 lg:border-l lg:pl-5">
              <div className="space-y-4 rounded-[0.65rem] border border-stone-300/70 bg-stone-100/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-1px_0_rgba(120,113,108,0.12)]">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500/90">Tool shelf</p>
                  <p className="text-sm text-stone-700/95">Optional photo tool</p>
                </div>

                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
                <label
                  htmlFor="photo"
                  className="group flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-stone-400/80 bg-stone-50/90 px-3 py-3 text-left text-sm text-stone-700 transition hover:border-stone-500"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-stone-200/90 text-base text-stone-700 transition group-hover:bg-stone-300/90">
                    +
                  </span>
                  <span className="leading-snug">
                    {photoName ? 'Replace photo' : 'Rest a photo on the bench'}
                  </span>
                </label>

                {photoName ? <p className="text-xs text-stone-500/95">Set on the bench: {photoName}</p> : null}
                {photoPreview ? (
                  <Image
                    src={photoPreview}
                    alt="Selected moment preview"
                    width={960}
                    height={640}
                    unoptimized
                    className="max-h-48 w-full rounded-md object-cover ring-1 ring-stone-300/70"
                  />
                ) : null}
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500/90">Actions</p>
                <div className="flex flex-wrap items-center gap-2">
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
            </aside>
          </div>
        </div>
      </form>
    </section>
  );
}
