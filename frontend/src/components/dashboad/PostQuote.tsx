import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { MessageCircle, Plus, Send } from 'lucide-react'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Alert, AlertDescription } from '../ui/alert'
import useCreateQuote from '@/api/services/quote/useCreateQuote'

export const PostQuote = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newQuote, setNewQuote] = useState({ quote: '' });
    const createQuoteMutation = useCreateQuote();
    const handleCreateQuote = async () => {
        if (!newQuote.quote.trim()) return;
        setIsSubmitting(true);
        try {
            await createQuoteMutation.mutateAsync({ quote: newQuote.quote.trim() });
            setNewQuote({ quote: '' });
            setShowCreateForm(false);
        } catch (error) {
            console.error('Create quote failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const resetForm = () => {
        setNewQuote({ quote: '' });
        setShowCreateForm(false);
    };
    return (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
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
                            value={newQuote.quote}
                            onChange={(e) => setNewQuote(prev => ({ ...prev, quote: e.target.value }))}
                            maxLength={300}
                            rows={4}
                        />
                        <div className="text-right text-xs text-gray-500 mt-1">
                            {newQuote.quote.length}/300
                        </div>
                    </div>
                    <Alert>
                        <AlertDescription>
                            💡 <strong>เคล็ดลับ:</strong> คำคมที่ดีควรมีความหมายลึกซึ้ง หรือทำให้คนอื่นยิ้มได้!
                        </AlertDescription>
                    </Alert>
                </div>
                <DialogFooter className="flex space-x-2">
                    <Button variant="outline" onClick={resetForm} disabled={isSubmitting}>
                        ยกเลิก
                    </Button>
                    <Button
                        onClick={handleCreateQuote}
                        disabled={isSubmitting || !newQuote.quote.trim()}
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
        </Dialog>
    )
}
