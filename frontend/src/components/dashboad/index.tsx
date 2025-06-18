import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { QuoteCard } from './QuoteCard';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import Header from './Header';
import useGetQuote from '@/api/services/quote/GetPaginatedQuotes';
import useVote from '@/api/services/vote/useVote';
import useCancelVote from '@/api/services/vote/useCancelVote';
import VotePieChart from './VotePieChart';
import * as Tabs from '@radix-ui/react-tabs';
import { useInView } from 'react-intersection-observer';
import { Paggines } from './paggines';
import { PostQuote } from './PostQuote';

interface Quote {
    _id: string;
    user_id: string;
    quote: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    hasVoted: boolean;
    canVote: boolean;
    isOwnQuote: boolean;
    voteCount: number;
}
type VoteFilter = 'all' | 'voted' | 'not_voted';

const QuoteVotingSystem = () => {
    const { userId, isAuthenticated, isLoading: userLoading } = useCurrentUser();
    const [searchTerm, setSearchTerm] = useState('');
    const [voteFilter, setVoteFilter] = useState<VoteFilter>('all');

    const [displayCount, setDisplayCount] = useState(12);
    const payload = {
        search: '',
        page: '1',
        limit: '50',
        sort: 'createdAt',
    };
    const { data: quotesData, isLoading, error } = useGetQuote(payload);

    const voteMutation = useVote(payload);
    const cancelVoteMutation = useCancelVote(payload);

    const { ref: loadMoreRef, inView } = useInView({ threshold: 0 });
    React.useEffect(() => {
        if (inView && displayedQuotes.length < filteredQuotes.length) {
            setDisplayCount((prev) => prev + 12);
        }
    }, [inView]);

    if (!quotesData?.docs) return null;

    let filteredQuotes = quotesData.docs.filter((quote: Quote) => {
        const matchesSearch = quote.quote.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesVote = true;
        if (voteFilter === 'voted') matchesVote = quote.hasVoted;
        if (voteFilter === 'not_voted') matchesVote = !quote.hasVoted;
        return matchesSearch && matchesVote;
    });
    const displayedQuotes = filteredQuotes.slice(0, displayCount);

    const votedCount = quotesData.docs.filter((q: Quote) => q.hasVoted).length;
    const notVotedCount = quotesData.docs.length - votedCount;



    if (isLoading || userLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <Header />
                <div className="p-4">
                    <div className="container mx-auto space-y-4">
                        <div className="text-center mb-8">
                            <Skeleton className="h-12 w-64 mx-auto mb-4" />
                            <Skeleton className="h-4 w-48 mx-auto" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <Card key={i}>
                                    <CardContent className="p-6">
                                        <Skeleton className="h-4 w-full mb-2" />
                                        <Skeleton className="h-4 w-3/4 mb-4" />
                                        <div className="flex space-x-2">
                                            <Skeleton className="h-8 w-16" />
                                            <Skeleton className="h-8 w-16" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
                <Header />
                <div className="container mx-auto text-center p-4">
                    <div className="text-8xl mb-6">😞</div>
                    <h2 className="text-2xl text-gray-700 mb-4">เกิดข้อผิดพลาดในการโหลดข้อมูล</h2>
                    <p className="text-gray-600">กรุณาลองใหม่อีกครั้ง</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <Tabs.Root defaultValue="quotes" className="w-full">
                    <Tabs.List className="flex gap-2 mb-6">
                        <Tabs.Trigger value="quotes" className="px-4 py-2 rounded-t bg-white/80 border-b-2 border-purple-500 text-purple-700 font-semibold">คำคม</Tabs.Trigger>
                        <Tabs.Trigger value="chart" className="px-4 py-2 rounded-t bg-white/80 border-b-2 border-pink-500 text-pink-700 font-semibold">สถิติ</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="quotes">
                        <div className="text-center mb-8">
                            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
                                💭 ระบบโหวตคำคม
                            </h1>
                            <p className="text-gray-600 mb-8 text-lg">รวมคำคมดี ๆ และคำกวน ๆ มาไว้ให้โหวตกัน</p>
                            {isAuthenticated && (
                                <PostQuote></PostQuote>
                            )}
                            {!isAuthenticated && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                                    <p className="text-yellow-800">
                                        🔐 <strong>เข้าสู่ระบบ</strong> เพื่อสร้างคำคมและโหวตคำคมของคนอื่น
                                    </p>
                                </div>
                            )}
                        </div>
                        <Paggines searchTerm={searchTerm} setSearchTerm={setSearchTerm} setVoteFilter={setVoteFilter} voteFilter={voteFilter} >
                            <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 text-center">
                                แสดง {displayedQuotes.length} / {filteredQuotes.length} คำคม
                            </div>
                        </Paggines>


                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {displayedQuotes.map((quote) => (
                                <QuoteCard
                                    voteMutation={voteMutation}
                                    cancelVoteMutation={cancelVoteMutation}
                                    payload={payload}
                                    key={quote._id}
                                    quote={quote}
                                    chckVote={isAuthenticated}
                                    currentUserId={userId || undefined}
                                />
                            ))}
                        </div>
                        {displayedQuotes.length < filteredQuotes.length && (
                            <div ref={loadMoreRef} className="text-center mt-12">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="bg-white/80 backdrop-blur-sm hover:bg-white border-purple-200 text-purple-700 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    กำลังโหลดเพิ่มเติม...
                                </Button>
                            </div>
                        )}
                        {filteredQuotes.length === 0 && (
                            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                                <CardContent className="text-center py-16">
                                    <div className="text-8xl mb-6">🤔</div>
                                    <CardTitle className="text-2xl text-gray-700 mb-4">ไม่พบคำคมที่ต้องการ</CardTitle>
                                    <CardDescription className="text-lg">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูสิ</CardDescription>
                                </CardContent>
                            </Card>
                        )}
                    </Tabs.Content>
                    <Tabs.Content value="chart">
                        <div className="flex flex-col items-center justify-center min-h-[300px]">
                            <VotePieChart voted={votedCount} notVoted={notVotedCount} />
                            <div className="text-center mt-2 text-sm text-gray-600">
                                สัดส่วนการโหวตทั้งหมด
                            </div>
                        </div>
                    </Tabs.Content>
                </Tabs.Root>
            </div>
        </div>
    );
};

export default QuoteVotingSystem;