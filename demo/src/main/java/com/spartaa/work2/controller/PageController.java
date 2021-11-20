package com.spartaa.work2.controller;

import com.spartaa.work2.models.Board;
import com.spartaa.work2.models.BoardRepository;
import com.spartaa.work2.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;


@Controller
public class PageController {
    @GetMapping("/")
    public String mainpage() {
        return "main.html";
    }

    @GetMapping("/list")
    public String listpage() {
        return "index.html";
    }

    @GetMapping("/writes")
    public String write() {
        return "write.html";
    }

    @GetMapping("/searches")
    public String search() {
        return "search.html";
    }

    @GetMapping("/updates")
    public String update() {
        return "update.html";
    }

    }



