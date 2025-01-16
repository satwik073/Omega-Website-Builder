import { FileIcon, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { UploadButton, UploadDropzone } from '@/lib/uploadthing'
import { IconBrandSoundcloud, IconCloudUp } from '@tabler/icons-react'

type Props = {
  apiEndpoint: 'agencyLogo' | 'avatar' | 'subaccountLogo'
  onChange: (url?: string) => void
  value?: string
}

const FileUpload = ({ apiEndpoint, onChange, value }: Props) => {
  const type = value?.split('.').pop()

  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {type !== 'pdf' ? (
          <div className="relative w-40 h-40">
            <Image
              src={value}
              alt="uploaded image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
            <IconBrandSoundcloud/>
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              View PDF
            </a>
          </div>
        )}
        <Button
          onClick={() => onChange('')}
          variant="ghost"
          type="button"
        >
          <X className="h-4 w-4" />
          Remove Logo
        </Button>
      </div>
    )
  }
  return (
    <div className="w-full bg-muted/30">

      <UploadDropzone
      className='ut-button:bg-black border rounded-2xl'
        endpoint={apiEndpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        content={{
          button({ ready, isUploading }) {
            if (ready) return <Button  className='-tracking-normal !text-sm '>Browse Files</Button>;
            if ( isUploading) return  <Button  className='-tracking-normal !text-sm '>Uploading...</Button>
            return "Getting ready...";
          },
          uploadIcon({ready}){
            if ( ready)return <div><IconCloudUp size={60}/></div>
          },
          label({ready}){
            if ( ready) return <div style={{ fontSize: '16px', fontWeight: 'bold' }} className=' mb-2 text-black'>Drag and drop your files here or click to upload</div>
            else return <div>Drag and drop your files here or click to upload</div>
          },
          allowedContent({ ready, fileTypes, isUploading }) {
            if (!ready) return "Checking what you allow";
            if (isUploading) return "Seems like stuff is uploading";
            return <div style={{color:'gray'}}> Supported formats: JPG, PNG (Max: 4MB)</div>
          },
        }}
        
      />
    </div>

  )
}

export default FileUpload
