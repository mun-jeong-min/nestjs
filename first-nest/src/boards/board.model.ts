export interface Board {
    id: string,  //게시글 스페셜ID
    title: string,  // 제목
    description: string, // 내용
    status: BoardStatus   // 게시글 공개,비공개 정하기
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}