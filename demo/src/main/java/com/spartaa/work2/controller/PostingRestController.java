package com.spartaa.work2.controller;

import com.spartaa.work2.models.Board;
import com.spartaa.work2.models.BoardRepository;
import com.spartaa.work2.models.BoardRequestDto;
import com.spartaa.work2.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
public class PostingRestController {
    private final BoardService boardService;
    private final BoardRepository boardRepository;

    // 전체 게시글 조회
    @GetMapping("/api/allpostings")
    public List<Board> getBoards() {
        return boardRepository.findAllByOrderByModifiedAtDesc();
    }
    // 상세 페이지 조회
    @GetMapping("/api/postings/{id}")
    public Optional<Board> getPosting(@PathVariable Long id) {
        Optional<Board> board =boardRepository.findById(id);
        return board;
    }

    // 게시글 작성
    @PostMapping("/api/postings")
    public Board writePostings(@RequestBody BoardRequestDto requestDto) {
        Board board = new Board(requestDto);
        return boardRepository.save(board);
    }

    //게시글 삭제
    @DeleteMapping( "/api/allpostings/{id}")
    public Long deletePosting(@PathVariable Long id) {
        boardRepository.deleteById(id);
        return id;
    }

    //게시글 업데이트
    @PutMapping("/api/postings/{id}")
    public Long updatePosting(@PathVariable Long id, @RequestBody BoardRequestDto requestDto) {
        boardService.update(id, requestDto);
        return id;
    }


}
