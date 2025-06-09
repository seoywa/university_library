import BookForm from '@/components/admin/forms/BookForm'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const NewBookPage = () => {
  return (
    <div>
      <Button className='back-btn' asChild>
        <Link href={'/admin/books'}>Go Back</Link>
      </Button>

      <section className='w-full max-w-2xl'>
        <BookForm />
      </section>
    </div>
  )
}

export default NewBookPage