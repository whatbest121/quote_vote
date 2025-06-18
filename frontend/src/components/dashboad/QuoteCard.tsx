import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ThumbsUp, Heart, Trash2, Pencil } from 'lucide-react'
import useCancelVote from '@/api/services/vote/useCancelVote'
import useVote from '@/api/services/vote/useVote'
import useCreateQuote from '@/api/services/quote/useCreateQuote'
import useDeleteQuote from '@/api/services/quote/useDeleteQuote'
import useEditQuote from '@/api/services/quote/useEditQuote'
import { UseMutationResult } from '@tanstack/react-query'
import { QuoteWithVoteStatusDto } from '@/api/generated'

interface QuoteWithVoteStatus {
    _id: string
    user_id: string
    quote: string
    createdAt: string
    updatedAt: string
    __v: number
    hasVoted: boolean
    canVote: boolean
    isOwnQuote: boolean
    voteCount: number
}

interface QuoteCardProps {
    quote: QuoteWithVoteStatus
    chckVote: boolean
    currentUserId?: string
    payload: {
        search: string;
        page: string;
        limit: string;
        sort: string;
    }
    voteMutation: UseMutationResult<QuoteWithVoteStatusDto, Error, string, unknown>
    cancelVoteMutation: UseMutationResult<QuoteWithVoteStatusDto, Error, string, unknown>
}

export const QuoteCard = ({ quote, chckVote, currentUserId, payload, voteMutation, cancelVoteMutation }: QuoteCardProps) => {

    const { mutate: mutateDeleteQuote } = useDeleteQuote(payload)
    const { mutate: mutateuseEditQuote } = useEditQuote()
    const handleVote = async (quoteId: string) => {
        try {
            await voteMutation.mutateAsync(quoteId);
        } catch (error) {
            console.error('Vote failed:', error);
        }
    };

    const handleCancelVote = async (quoteId: string) => {
        try {
            await cancelVoteMutation.mutateAsync(quoteId);
        } catch (error) {
            console.error('Cancel vote failed:', error);
        }
    };

    if (quote.isOwnQuote) {
        return (
            <Card key={quote._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border border-gray-100 h-fit">
                <CardContent className="p-6">
                    <div className="mb-4">
                        <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                            คำคมของคุณ
                        </Badge>
                        <blockquote className="text-base text-gray-800 mb-4 leading-relaxed font-medium">
                            "{quote.quote}"
                        </blockquote>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-500">
                            {new Date(quote.createdAt).toLocaleDateString('th-TH')}
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card key={quote._id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border border-gray-100 h-fit relative">
            <CardContent className="p-6">
                {quote.user_id == currentUserId && (
                    <Button
                        onClick={() => mutateDeleteQuote(quote._id)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 text-red-500 hover:bg-red-50"
                        aria-label="ลบคำคม"
                    >
                        <Trash2 className="h-5 w-5" />
                    </Button>
                )}
                <div className="mb-4 flex items-center">
                    <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 mr-2">
                        คำคม
                    </Badge>
                    {quote.user_id === currentUserId && (
                        <Button
                            onClick={() => mutateuseEditQuote({ _id: quote._id, quote: quote.quote })}
                            variant="ghost"
                            size="icon"
                            className="ml-1 text-blue-500 hover:bg-blue-50"
                            aria-label="แก้ไขคำคม"
                        >
                            <Pencil className="h-5 w-5" />
                        </Button>
                    )}
                </div>
                <blockquote className="text-base text-gray-800 mb-4 leading-relaxed font-medium flex items-center">
                    "{quote.quote}"
                </blockquote>

                <div className="flex items-center mb-2">
                    <Heart className="h-4 w-4 mr-1 text-pink-500" fill="#ec4899" />
                    <span className="text-sm font-semibold text-pink-600">{quote.voteCount}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {quote.user_id !== currentUserId && chckVote && (
                        <div className="flex items-center space-x-2">
                            {quote.hasVoted ? (
                                <Button
                                    onClick={() => handleCancelVote(quote._id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-full"
                                    disabled={cancelVoteMutation.isPending}
                                >
                                    <Heart className="h-4 w-4 mr-1 fill-current" />
                                    ยกเลิกโหวต
                                </Button>
                            ) : quote.canVote ? (
                                <Button
                                    onClick={() => handleVote(quote._id)}
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-600 hover:bg-green-50 px-3 py-1 rounded-full"
                                    disabled={voteMutation.isPending}
                                >
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    โหวต
                                </Button>
                            ) : (
                                <div className="text-xs text-gray-400 px-3 py-1">
                                    โหวตแล้ว
                                </div>
                            )}
                        </div>
                    )}

                    <div className="text-xs text-gray-500">
                        {new Date(quote.createdAt).toLocaleDateString('th-TH')}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
