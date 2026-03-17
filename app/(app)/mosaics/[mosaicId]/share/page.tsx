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
    <section className="mx-auto max-w-4xl bg-stone-100/70 px-4 pb-12 sm:px-6">
      <form
        onSubmit={handlePlaceTessera}
        className="relative mt-4 overflow-hidden rounded-[0.35rem] border border-stone-200/85 bg-stone-50 p-6 sm:p-8"
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

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
            <div className="space-y-4">
              <p className="text-base font-medium text-stone-800">What would you like this tessera to hold?</p>

              <div className="rounded-[0.35rem] bg-stone-200/62 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_0_0_1px_rgba(87,83,78,0.18),inset_0_10px_16px_rgba(68,64,60,0.04)] sm:p-8">
                <textarea
                  id="reflection"
                  value={reflection}
                  onChange={(event) => setReflection(event.target.value)}
                  placeholder="Begin with the part of this moment you most want to keep."
                  rows={9}
                  className="w-full resize-none border-0 bg-transparent p-0 text-base leading-relaxed text-stone-800 outline-none placeholder:text-stone-400/90"
                />
              </div>

            </div>

            <aside className="space-y-5 rounded-[0.35rem] bg-stone-100/78 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.42),inset_0_0_0_1px_rgba(120,113,108,0.14)] lg:pl-5">
              <p className="text-xs uppercase tracking-[0.14em] text-stone-500/90">Tool shelf</p>

              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500/90">Photo</p>
                <input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="sr-only"
                />
                <label
                  htmlFor="photo"
                  className="inline-flex cursor-pointer items-center text-sm text-stone-700/95 transition hover:text-stone-900"
                >
                  + {photoName ? 'Replace photo' : 'Add photo'}
                </label>

                {photoPreview ? (
                  <div className="rounded-[0.3rem] bg-stone-200/55 p-1 shadow-[inset_0_0_0_1px_rgba(87,83,78,0.14),inset_0_1px_0_rgba(255,255,255,0.28)]">
                    <Image
                      src={photoPreview}
                      alt="Selected moment preview"
                      width={960}
                      height={640}
                      unoptimized
                      className="max-h-52 w-full rounded-[0.2rem] object-cover"
                    />
                  </div>
                ) : null}
                {photoName ? <p className="text-xs text-stone-500/95">Attached: {photoName}</p> : null}
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500/90">Actions</p>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/mosaics/${mosaicId}`}
                    className="rounded-[0.35rem] border border-stone-400/45 bg-stone-100/55 px-4 py-2 text-sm text-stone-700 transition hover:border-stone-500/50 hover:bg-stone-100/75 hover:text-stone-900"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={!canPlaceTessera}
                    className="rounded-[0.35rem] border border-stone-900/85 bg-stone-900 px-5 py-2 text-sm text-stone-100 shadow-[0_1px_2px_rgba(28,25,23,0.28)] transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:border-stone-400/60 disabled:bg-stone-300 disabled:text-stone-100 disabled:shadow-none"
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
