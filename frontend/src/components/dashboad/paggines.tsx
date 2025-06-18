import React, { ReactNode } from 'react'
import { Card, CardContent } from '../ui/card'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
type VoteFilter = 'all' | 'voted' | 'not_voted';
interface PagginesProps {
    children: ReactNode
    searchTerm: string
    setSearchTerm: (x: string) => void
    voteFilter: string
    setVoteFilter: (x: VoteFilter) => void
}


export const Paggines = ({ children, searchTerm, setSearchTerm, setVoteFilter, voteFilter }: PagginesProps) => {
    return (
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="ค้นหาคำคม..."
                            className="pl-10 bg-white"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={voteFilter} onValueChange={v => setVoteFilter(v as VoteFilter)}>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="กรองสถานะโหวต" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">ทั้งหมด</SelectItem>
                            <SelectItem value="voted">โหวตแล้ว</SelectItem>
                            <SelectItem value="not_voted">ยังไม่ได้โหวต</SelectItem>
                        </SelectContent>
                    </Select>

                    {children}

                </div>
            </CardContent>
        </Card>
    )
}
