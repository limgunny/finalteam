import { NextRequest, NextResponse } from 'next/server'
import connectMongoDB from '@/libs/mongodb'
import Board from '@/models/board'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectMongoDB()
    const board = await Board.findById(params.id)

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 })
    }

    // 조회수 증가
    board.views = (board.views || 0) + 1
    await board.save()

    return NextResponse.json(board)
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching board' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const { title, content, image } = await req.json()

    await connectMongoDB()

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    )

    if (!updatedBoard) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedBoard)
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    await connectMongoDB()

    const deletedBoard = await Board.findByIdAndDelete(id)

    if (!deletedBoard) {
      return NextResponse.json(
        { message: '게시글을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: '게시글이 삭제되었습니다.' })
  } catch (error) {
    return NextResponse.json(
      { message: '게시글 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
