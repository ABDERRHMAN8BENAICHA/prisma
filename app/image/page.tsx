"use client"
import * as React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzoneUsage } from '@/components/SingleImageDropzoneUsage';
import { Button } from '@/components/ui/button';

export default function Page() {
    return (
        <main>
            <SingleImageDropzoneUsage />
            {/* <Button>Click me</Button> */}
        </main>
    );
}