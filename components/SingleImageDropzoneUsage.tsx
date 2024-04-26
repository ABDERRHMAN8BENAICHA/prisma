'use client';

import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/button';

export function SingleImageDropzoneUsage() {
    const [myRes, setmyRes] = useState<{ url: string }>();
    const [file, setFile] = useState<File>();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0);

    return (
        <div>
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
            <div className='m-3 h-2 w-44 rounded overflow-hidden border'>
            <div className={`dark:bg-white bg-black h-full transition-all duration-300 `} style={{width : `${progress}%`}} />
            </div>
            {myRes && <Image src={myRes.url} width={200} height={200} alt='lol' />}
        </div>
    );
}