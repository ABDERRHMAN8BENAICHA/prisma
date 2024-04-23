'use client';

import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import Image from 'next/image';
import { useState } from 'react';

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
            <div className='m-3 h-2 w-44 rounded overflow-hidden border  '>
                <div className='bg-white h-full transition-all duration-300' style={{width : `${progress}%`}} />
            </div>
            <button
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.publicFiles.upload({
                            file,
                            options : {

                            },
                            onProgressChange: (progress) => {
                                // you can use this to show a progress bar
                                setProgress(progress)
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
            </button>
            {myRes && <Image src={myRes.url} width={200} height={200}  alt='lol'/>}
        </div>
    );
}