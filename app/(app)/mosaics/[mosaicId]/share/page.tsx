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
    <section className="mx-auto max-w-2xl px-2 pb-10">
      <p className="page-kicker">Add a tessera</p>
      <h1 className="page-title">Add a tessera</h1>
      <p className="page-body mt-3 max-w-xl text-stone-700/95">
        A tessera begins with a reflection. Photos are optional.
      </p>

      <form onSubmit={handlePlaceTessera} className="mt-8 space-y-7">
        <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500/95">Mosaic chapter • {mosaicId}</p>

        <div className="space-y-3">
          <label htmlFor="reflection" className="block text-base font-medium text-stone-900">
            What would you like to place here?
          </label>
          <textarea
            id="reflection"
            value={reflection}
            onChange={(event) => setReflection(event.target.value)}
            placeholder="Begin with the part of this moment you want to remember."
            rows={8}
            className="w-full rounded-2xl border border-stone-300/75 bg-stone-50/60 px-4 py-3 text-base leading-relaxed text-stone-800 outline-none transition placeholder:text-stone-500/80 focus:border-stone-400 focus:ring-2 focus:ring-stone-300/55"
          />
          <p className="text-sm leading-relaxed text-stone-600/95">
            Take your time. Let the reflection carry the moment, even if you add a photo.
          </p>
        </div>

        <div className="space-y-3 pt-1">
          <label htmlFor="photo" className="block text-sm font-medium text-stone-700/95">
            Add a photo, if it belongs with the moment
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="block w-full rounded-xl border border-stone-300/70 bg-stone-50/70 px-3 py-2 text-sm text-stone-700 file:mr-3 file:rounded-full file:border-0 file:bg-stone-200/90 file:px-3 file:py-1.5 file:text-sm file:text-stone-700"
          />
          {photoName ? <p className="text-xs text-stone-500/95">Selected: {photoName}</p> : null}
          {photoPreview ? (
            <Image
              src={photoPreview}
              alt="Selected moment preview"
              width={960}
              height={640}
              unoptimized
              className="max-h-64 w-full rounded-xl object-cover ring-1 ring-stone-300/70"
            />
          ) : null}
        </div>

        <div className="flex items-center gap-3 pt-3">
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
      </form>
    </section>
  );
}
