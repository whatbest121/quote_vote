import React, { useState, useEffect, useMemo } from 'react';
import { Search, Heart, ThumbsUp, ThumbsDown, TrendingUp, Filter, BarChart3, List, Grid, Plus, Send, X, MessageCircle, Layout, LayoutGrid, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import useGetQuote from '@/api/services/quote/GetPaginatedQuotes';

// Mock data
const generateMockQuotes = () => {
    const quotes = [
        { id: 1, text: "ชีวิตสั้น ๆ ทำให้มันมีความหมาย", author: "นักปรัชญาไทย", upvotes: 245, downvotes: 12, category: "life", createdAt: "2024-01-15" },
        { id: 2, text: "รักคือการให้ไม่หวังผลตอบแทน แต่เราก็อยากได้คืน 555", author: "คนขี้เหงา", upvotes: 189, downvotes: 34, category: "love", createdAt: "2024-01-20" },
        { id: 3, text: "เงินไม่ใช่ทุกอย่าง แต่ทุกอย่างต้องใช้เงิน", author: "คนจน", upvotes: 567, downvotes: 45, category: "money", createdAt: "2024-02-01" },
        { id: 4, text: "ความสุขอยู่ในใจ แต่ใจอยู่ในกระเป๋า", author: "นักช็อป", upvotes: 123, downvotes: 67, category: "life", createdAt: "2024-02-05" },
        { id: 5, text: "หิวข้าวกิน หิวน้ำดื่ม หิวรักก็หาคนรัก", author: "คนหิว", upvotes: 234, downvotes: 23, category: "love", createdAt: "2024-02-10" },
        { id: 6, text: "การทำงานไม่ใช่ทุกอย่าง แต่ไม่ทำงานไม่มีอะไร", author: "วัยทำงาน", upvotes: 456, downvotes: 78, category: "work", createdAt: "2024-02-15" },
        { id: 7, text: "สวยได้ด้วยเงิน แต่เงินได้ยากด้วยความสวย", author: "นางงาม", upvotes: 345, downvotes: 89, category: "money", createdAt: "2024-02-20" },
        { id: 8, text: "เพื่อนแท้มีน้อย เพื่อนเฟคมีเยอะ", author: "คนผิดหวัง", upvotes: 678, downvotes: 34, category: "friendship", createdAt: "2024-02-25" },
        { id: 9, text: "อดทนวันนี้ เพื่อวันพรุ่งที่ดีกว่า หรือแย่กว่า ใครจะรู้", author: "คนรอคอย", upvotes: 234, downvotes: 56, category: "life", createdAt: "2024-03-01" },
        { id: 10, text: "รักตัวเอง รักคนอื่น รักเงินมากกว่า", author: "คนซื่อ", upvotes: 456, downvotes: 23, category: "love", createdAt: "2024-03-05" },
        { id: 11, text: "ฝันใหญ่ไว้ ถ้าไม่สำเร็จก็เอาไว้นอน", author: "คนมองโลกในแง่ดี", upvotes: 321, downvotes: 45, category: "life", createdAt: "2024-03-10" },
        { id: 12, text: "มีเงินมีมิตร ไม่มีเงินมีแต่ดิตร", author: "คนรู้จริง", upvotes: 289, downvotes: 12, category: "money", createdAt: "2024-03-15" },
    ];

    return quotes;
};

const d = {
    "docs": [
        {
            "_id": "6852cb4cec7312b25bc6a238",
            "user_id": "6851373a42ef335a8f5350f2",
            "quote": "สีเกลือง",
            "createdAt": "2025-06-18T14:21:00.095Z",
            "updatedAt": "2025-06-18T14:21:00.095Z",
            "__v": 0
        },
        {
            "_id": "6852c492d06917f4623330f5",
            "user_id": "6850d631ad40604e81de5b85",
            "quote": "สีเหลืdd",
            "createdAt": "2025-06-18T13:52:18.182Z",
            "updatedAt": "2025-06-18T14:02:47.451Z",
            "__v": 0
        },
        {
            "_id": "6852c3be7704dafee2e8d1e1",
            "user_id": "6850d631ad40604e81de5b85",
            "quote": "สีเหลือง",
            "createdAt": "2025-06-18T13:48:46.588Z",
            "updatedAt": "2025-06-18T13:48:46.588Z",
            "__v": 0
        },
        {
            "_id": "68523904f637b517638d2dfa",
            "user_id": "6850d631ad40604e81de5b85",
            "quote": "สีเหลื",
            "createdAt": "2025-06-18T03:56:52.550Z",
            "updatedAt": "2025-06-18T14:01:59.052Z",
            "__v": 0
        }
    ],
    "totalDocs": 4,
    "limit": 10,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
}

const QuoteVotingSystem = () => {

    const { data } = useGetQuote("")
    console.log("🚀 ~ data:", data)
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('popular');
    const [layoutStyle, setLayoutStyle] = useState('cards-4'); // cards-4, cards-3, masonry, compact
    const [displayCount, setDisplayCount] = useState(12);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newQuote, setNewQuote] = useState({
        text: '',
        author: '',
        category: 'life'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize data
    useEffect(() => {
        setTimeout(() => {
            const mockData = generateMockQuotes();
            setQuotes(mockData);
            setLoading(false);
        }, 1000);
    }, []);

    // Categories
    const categories = [
        { value: 'all', label: 'ทั้งหมด' },
        { value: 'life', label: 'ชีวิت' },
        { value: 'love', label: 'ความรัก' },
        { value: 'money', label: 'เงิน' },
        { value: 'work', label: 'การงาน' },
        { value: 'friendship', label: 'มิตรภาพ' }
    ];

    // Layout options
    const layoutOptions = [
        { value: 'cards-4', label: '4 คอลัมน์', icon: LayoutGrid },
        { value: 'cards-3', label: '3 คอลัมน์', icon: Grid },
        { value: 'masonry', label: 'Masonry', icon: Layers },
        { value: 'compact', label: 'แบบกะทัดรัด', icon: List }
    ];

    // Filter and sort quotes
    const processedQuotes = useMemo(() => {
        let result = quotes.filter(quote => {
            const matchesSearch = quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || quote.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        switch (sortBy) {
            case 'popular':
                result.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'most_voted':
                result.sort((a, b) => (b.upvotes + b.downvotes) - (a.upvotes + a.downvotes));
                break;
        }

        return result;
    }, [quotes, searchTerm, selectedCategory, sortBy]);

    const displayedQuotes = processedQuotes.slice(0, displayCount);

    // Vote handlers
    const handleVote = (quoteId, type) => {
        setQuotes(prev => prev.map(quote => {
            if (quote.id === quoteId) {
                return {
                    ...quote,
                    [type]: quote[type] + 1
                };
            }
            return quote;
        }));
    };

    // Create new quote
    const handleCreateQuote = async () => {
        if (!newQuote.text.trim() || !newQuote.author.trim()) {
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            const newQuoteData = {
                id: Math.max(...quotes.map(q => q.id)) + 1,
                text: newQuote.text.trim(),
                author: newQuote.author.trim(),
                category: newQuote.category,
                upvotes: 0,
                downvotes: 0,
                createdAt: new Date().toISOString().split('T')[0]
            };

            setQuotes(prev => [newQuoteData, ...prev]);
            setNewQuote({ text: '', author: '', category: 'life' });
            setShowCreateForm(false);
            setIsSubmitting(false);
        }, 1000);
    };

    const resetForm = () => {
        setNewQuote({ text: '', author: '', category: 'life' });
        setShowCreateForm(false);
    };

    const loadMore = () => {
        setDisplayCount(prev => prev + 12);
    };

    // Render quote card based on layout
    const renderQuoteCard = (quote, layout) => {
        return (
            <Card key={quote.id} className={`${"hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white rounded-2xl overflow-hidden border border-gray-100"} h-fit`}>
                <CardContent className="p-6">
                    <div className="mb-4">
                        <Badge variant="secondary" className="mb-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700">
                            {categories.find(c => c.value === quote.category)?.label}
                        </Badge>
                        <blockquote className="text-base text-gray-800 mb-4 leading-relaxed font-medium">
                            "{quote.text}"
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
        );


    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
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
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
                        💭 ระบบโหวตคำคม
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">รวมคำคมดี ๆ และคำกวน ๆ มาไว้ให้โหวตกัน</p>

                    {/* Create Quote Dialog */}
                    {/* <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                                <Plus className="h-6 w-6 mr-3" />
                                สร้างคำคมใหม่
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="flex items-center space-x-2">
                                    <MessageCircle className="h-6 w-6 text-purple-600" />
                                    <span>สร้างคำคมใหม่</span>
                                </DialogTitle>
                                <DialogDescription>
                                    แบ่งปันคำคมดี ๆ หรือคำกวน ๆ ของคุณกับทุกคน
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="quote-text">คำคม *</Label>
                                    <Textarea
                                        id="quote-text"
                                        placeholder="พิมพ์คำคมของคุณที่นี่... 💭"
                                        value={newQuote.text}
                                        onChange={(e) => setNewQuote(prev => ({ ...prev, text: e.target.value }))}
                                        maxLength={300}
                                        rows={4}
                                    />
                                    <div className="text-right text-xs text-gray-500 mt-1">
                                        {newQuote.text.length}/300
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="quote-author">ผู้เขียน *</Label>
                                    <Input
                                        id="quote-author"
                                        placeholder="ชื่อผู้เขียนหรือแหล่งที่มา"
                                        value={newQuote.author}
                                        onChange={(e) => setNewQuote(prev => ({ ...prev, author: e.target.value }))}
                                        maxLength={50}
                                    />
                                </div>

                                <Alert>
                                    <AlertDescription>
                                        💡 <strong>เคล็ดลับ:</strong> คำคมที่ดีควรมีความหมายลึกซึ้ง หรือทำให้คนอื่นยิ้มได้ อย่าลืมระบุแหล่งที่มาด้วยนะ!
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <DialogFooter className="flex space-x-2">
                                <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
                                    ยกเลิก
                                </Button>
                                <Button
                                    onClick={handleCreateQuote}
                                    disabled={isSubmitting || !newQuote.text.trim() || !newQuote.author.trim()}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                            กำลังโพสต์...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4 mr-2" />
                                            โพสต์คำคม
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog> */}
                </div>

                {/* Controls */}

                {/* <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                             {/* Search *
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="ค้นหาคำคม..."
                                    className="pl-10 bg-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Category Filter 
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="เลือกหมวดหมู่" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort 
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="เรียงตาม" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popular">ยอดนิยม</SelectItem>
                                    <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                                    <SelectItem value="oldest">เก่าที่สุด</SelectItem>
                                    <SelectItem value="most_voted">โหวตมากสุด</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Layout Style 
                            <Select value={layoutStyle} onValueChange={setLayoutStyle}>
                                <SelectTrigger className="bg-white">
                                    <SelectValue placeholder="รูปแบบการแสดง" />
                                </SelectTrigger>
                                <SelectContent>
                                    {layoutOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>
                                            <div className="flex items-center space-x-2">
                                                <option.icon className="h-4 w-4" />
                                                <span>{option.label}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Stats 
                            <div className="text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2 text-center">
                                แสดง {displayedQuotes.length} / {processedQuotes.length} คำคม
                            </div>
                        </div>
                    </CardContent>
                </Card>*/}

                {/* Quotes Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayedQuotes.map((quote) => renderQuoteCard(quote, layoutStyle))}
                </div>

                {/* Load More Button */}
                {displayedQuotes.length < processedQuotes.length && (
                    <div className="text-center mt-12">
                        <Button
                            onClick={loadMore}
                            variant="outline"
                            size="lg"
                            className="bg-white/80 backdrop-blur-sm hover:bg-white border-purple-200 text-purple-700 px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            โหลดเพิ่มเติม ({processedQuotes.length - displayedQuotes.length} คำคม)
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {/* {processedQuotes.length === 0 && (
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                        <CardContent className="text-center py-16">
                            <div className="text-8xl mb-6">🤔</div>
                            <CardTitle className="text-2xl text-gray-700 mb-4">ไม่พบคำคมที่ต้องการ</CardTitle>
                            <CardDescription className="text-lg">ลองเปลี่ยนคำค้นหาหรือหมวดหมู่ดูสิ</CardDescription>
                        </CardContent>
                    </Card>
                )} */}
            </div>
        </div>
    );
};

export default QuoteVotingSystem;