'use client';

import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from "@/components/ui/progress"


export function SingleImageDropzoneUsage() {
    const [myRes, setmyRes] = useState<{ url: string }>();
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);
    window.localStorage.setItem('myRes', JSON.stringify(myRes?.url));
    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                onChange={(file) => {
                    setFile(file);
                }}
            />
            <Button 
                onClick={async () => {
                    if (file) {
                        const maxSize = 10 * 1024 * 1024; // 10MB
                        if (file.size > maxSize) {
                            alert("File size exceeds the maximum allowed size.");
                            return;
                        }
                        const res = await edgestore.publicFiles.upload({
                            file,
                            onProgressChange: (progress) => {
                                setProgress(progress);
                            },
                        });
                        // you can run some server action or api here
                        // to add the necessary data to your database
                        console.log(res);
                        setmyRes(res);
                    }
                }}
            >
                Upload
            </Button>
            <Progress value={progress}  />
        </div>
    );
}