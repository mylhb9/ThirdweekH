
let postid;
let postdtos;
function onclickedit(e) {
    postid = e.target.dataset.id;

    let post;
    for (postdto of postdtos) {
        if(postdto.id == Number(postid) ) {
            post = postdto;
        }
    }
    console.log(angry(post));
    $('#posthi').empty();
    $('#posthi').append(angry(post));
    $("#modal-post").addClass("is-active")
    console.log($("#modal-post"));

}
//선택 게시글 보여주기 함수
function showOnePosting(id) {
    $.ajax({
        type: 'GET',
        url: `/api/postings/${id}`,
        success: function (response) {
            $('#changearticle').empty();
            let temphtml = addPostingOneList(response);
            $('#changearticle').append(temphtml);
        }
    })
}


// //선택 게시글 보여주기 함수
// function showOnePosting(id) {
//     $.ajax({
//         type: 'GET',
//         url: '/api/postings',
//         success: function (response) {
//             $('#changearticle').empty();
//             let temphtml = addPostingOneList(response[id-1]);
//             $('#changearticle').append(temphtml);
//         }
//     })
// }


//주소에서 id 변수값 뽑아주는 함수
function  getParamMap(queryString) {
    let splited = queryString.replace("?", "").split(/[=?&]/);
    let param = {};
    for (let i =0; i<splited.length; i++) {
        param[splited[i]] = splited[++i];
    }
    return param;
}


function angry(postdto) {
    return `<div class="modal" id="modal-post">
                <div class="modal-background" onclick='$("#modal-post").removeClass("is-active")'></div>
                <div class="modal-content">
                    <div class="box">
                        <article class="media">
                            <div class="media-content">
                                <div style="width: 10vw;"  class="field">
                                    <label class="label" for="modalname">작성자</label>

                                    <p class="control">

                                        <input id="modalname" class="input"
                                               placeholder="제목을 입력해주세요" value="${postdto.name}">
                                    </p>
                                </div>
                                <div class="field">
                                    <label class="label" for="modaltitle">제목</label>

                                    <p class="control">

                                        <input id="modaltitle" class="input"
                                               placeholder="제목을 입력해주세요" value="${postdto.title}">
                                    </p>
                                </div>
                                <div class="field">
                                    <label class="label" for="input-name" >내용</label>
                                    <p class="control">
                                            <textarea id="modalcontent" class="textarea"
                                                      placeholder="내용을 작성해주세요" >${postdto.content}</textarea>
                                    </p>
                                </div>
                                <nav class="level is-mobile">
                                    <div class="level-left">

                                    </div>
                                    <div class="level-right">
                                        <div class="level-item">
                                            <a class="button is-sparta" onclick="submitEdit(${postdto.id})">수정하기</a>
                                        </div>
                                        <div class="level-item">
                                            <a class="button is-sparta is-outlined"
                                               onclick='$("#modal-post").removeClass("is-active")'>취소</a>
                                        </div>
                                    </div>
                                </nav>
                            </div>
                        </article>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close"
                        onclick='$("#modal-post").removeClass("is-active")'></button>
            </div>`
}


// 게시글 하나 받아와서 작성하는 함수, 정보를 받아와야 작동이 된다.
function addPostingOneList(postingsDto) {
    // link, image, title, lprice, myprice 변수 활용하기
    return `<div><header class="mb-4">
                    <!-- Post title-->
                    <h1 class="fw-bolder mb-1">${postingsDto.title}</h1>
                    <!-- Post meta content-->
                    <div class="text-muted fst-italic mb-2">${postingsDto.name}</div>
                    <!-- Post categories-->
                    <a class="badge bg-secondary text-decoration-none link-light" href="#!">게시글 번호: ${postingsDto.id}</a>
                    <a style="float: right;" class="badge bg-secondary text-decoration-none link-light" href="update.html?id=${postingsDto.id}">수정하기</a>
                    
                </header>
                
                <section class="mb-5">
                    <p class="fs-5 mb-4">${postingsDto.content}</p>
        
                </section></div>`;
}
// 모든 게시글 보여주기 함수
function showallposting() {
    $.ajax({
        type: 'GET',
        url: '/api/allpostings',
        success: function (response) {
            $('#allposts').empty();
            for (let i = 0; i < response.length; i++) {

                let postings = response[i];
                let tempHtml = addPostingList(postings);
                $('#allposts').append(tempHtml);
            }
            postdtos = response;
        }
    })
}
// 게시글 목록 받아와서 작성하는 함수, 정보를 받아와야 작동이 된다.
function addPostingList(postingsDto) {

    return `<tr>
                <th id="myide${postingsDto.id}" scope="row">${postingsDto.id}</th>
               <td> <a href="search.html?id=${postingsDto.id}" style="cursor:pointer" > ${postingsDto.title} </a></td>
                <td>${postingsDto.name}</td>
                <td>${postingsDto.createdAt}</td>
                <td></td>
                <td><button onclick='onclickedit(event)' data-id=${postingsDto.id}>수정</button></td>
                <td><button onclick='deleteOne(${postingsDto.id})'>삭제</button></td>
            </tr>`;
}

//게시글 정보 저장하는 함수
function addPosting() {
    let title = $('#postingtitle').val();
    let content = $('#postingcontent').val();
    let name = $('#postingname').val();
    let data = {'title':title, 'content':content, 'name':name};
    $.ajax({
        type: "POST",
        url: '/api/postings',
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert("저장되었습니다.");
            window.location.replace("index.html");

        }
    })
}
//게시글 수정하기
function submitEdit(id) {

    let title = $('#modaltitle').val();
    let content = $('#modalcontent').val();
    let name = $('#modalname').val();

    console.log(id);
    let data = {'title':title, 'content':content, 'name':name};
    $.ajax({
        type: "PUT",
        url: `/api/postings/${id}`,
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            alert('작성글 수정에 성공하였습니다.');
            window.location.reload();
        }
    });
}

function clearcontext() {
    $('#postingname').val("");
    $('#postingtitle').val("");
    $('#postingcontent').val("");
    $('#postingname').focus();
}

//게시물 삭제 기능
function deleteOne(id) {
    $.ajax({
        type: "DELETE",
        url: `/api/allpostings/${id}`,
        success: function (response) {
            alert('게시물 삭제에 성공하였습니다.');
            window.location.reload();
        }
    })
}



