"use client"
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzoneUsage } from '@/components/SingleImageDropzoneUsage';

export default function Page() {
    return (
        <main>
            <SingleImageDropzoneUsage />
        </main>
    );
}