import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { QuoteReturn } from '@/api/services/quote/GetPaginatedQuotes'

interface QuoteCardProps {
    quote: QuoteReturn
    // chckVote:
}

export const QuoteCard = ({quote}:QuoteCardProps) => {

    return (
        <Card key={quote._id} className={`${"hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border border-gray-100"} h-fit`}>
            <CardContent className="p-6">
                <div className="mb-4">
                    <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                        {quote._id}
                    </Badge>
                    <blockquote className="text-base text-gray-800 mb-4 leading-relaxed font-medium">
                        "{quote.quote}"
                    </blockquote>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                        <Button
                            onClick={() => handleVote(quote.id, 'upvotes')}
                            variant="ghost"
                            size="sm"
                            className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-full"
                        >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {quote.upvotes}
                        </Button>

                        <Button
                            onClick={() => handleVote(quote.id, 'downvotes')}
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-full"
                        >
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            {quote.downvotes}
                        </Button>
                    </div>

                    <div className="text-xs text-gray-500">
                        {new Date(quote.createdAt).toLocaleDateString('th-TH')}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
