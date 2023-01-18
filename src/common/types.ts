import React from 'react'

interface IArticleCard {
 id: number
 imageUrl: string
 title: string
 summary: string
 highlight: string
 publishedAt: string
}

interface IArticlePage {
 title: string
 summary: string
 imageUrl: string
}

interface ILoaderProps {
 isLoaded: boolean
 children: React.ReactNode
}

// export all types from this file
export type { IArticleCard, IArticlePage, ILoaderProps }