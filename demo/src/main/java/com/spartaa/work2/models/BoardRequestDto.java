package com.spartaa.work2.models;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class BoardRequestDto {

    private final Long id;
    private final String title;
    private final String name;
    private final String content;
}
