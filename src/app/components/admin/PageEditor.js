'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import PagePreview from './PagePreview'

export default function PageEditor({ pageId, pageName }) {
  const [isEditing,setIsEditing]=useState(false);
  const [isLoading,setIsloading]=useState(false);
  const [moduleId,setModulId]=useState(null);

  return<>
  <div>
   <span>
    <h3>{pageName}</h3> 
    <Button onClick={()=>{setIsEditing(!isEditing)
    setModulId(pageId)
    }}>{isEditing!==true?'edit':'save'}
    </Button>
   </span> 
  </div>
  {moduleId!==null&&isEditing==true&&<div>
    <PagePreview
    pageid={moduleId}
    isedit={setIsEditing}
    moduleid={setModulId}
    />
    {/* <Button onClick={()=>{
      setIsEditing(!isEditing)
      setModulId(null)
    }}>close</Button> */}
  </div>}
  </>
}