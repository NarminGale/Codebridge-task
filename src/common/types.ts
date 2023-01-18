import React from 'react'

export interface Article {
 id: number
 imageUrl: string
 title: string
 summary: string
 highlight: string
 publishedAt: string
}

export interface LoaderProps {
 isLoaded: boolean
 children: React.ReactNode
}
