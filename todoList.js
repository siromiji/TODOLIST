// 페이지 열릴 때 실행되는 함수 
window.onload = function(){
    const checkNumDiv = document.getElementById("checkMoney");
    const todoInput = document.getElementById("todoInput");

    // 엔터 키 입력 시 addTodo 호출
    todoInput.addEventListener("keydown", function (event){
        if (event.key === "Enter"){
            addTodo();
        }
    });

    // 적립금 사용(차감)
    checkNumDiv.onclick = function() {
        let moneyBasic = Number(document.getElementById("money").innerText);
        let amount = prompt("사용하시겠습니까?", "100");
        if (amount === null || amount.trim() === "") return;

        let change = Number(amount);
        if (isNaN(change)){
            alert("숫자만 입력해주세요");
            return;
        }
        let newMoney = moneyBasic - change;
        document.getElementById("money").innerText = newMoney;
        saveMoney(newMoney);
    };

    // 1) 저장된 할 일 가져와서 li 생성
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    savedTodos.forEach(text => createTodoItem(text));

    // 2) 저장된 적립금 가져오기 (함수명과 변수명 충돌 방지)
    const savedMoney = localStorage.getItem("money");
    if (savedMoney !== null) {
        document.getElementById("money").innerText = savedMoney;
    }
};

function addTodo(){
    const input = document.getElementById("todoInput");
    const value = input.value.trim();
    if (value === ""){
        alert("할 일을 입력해주세요.");
        return;
    }
    createTodoItem(value);
    input.value = "";
    saveTodos();
}

// li 생성 + 이벤트 한 번에 붙이기
function createTodoItem(text){
    const li = document.createElement("li");
    li.textContent = text;
    li.dataset.original = text; // 원본 텍스트 저장
    attachLiEvents(li);
    document.getElementById("todoList").appendChild(li);
}

// hover/leave/클릭 이벤트
function attachLiEvents(li){
    const heartImg = document.getElementById("heartImg");

    // 마우스 올리면 "완료", 벗어나면 원래대로
    li.addEventListener("mouseenter", () => {
        li.textContent = "완료";
        li.style.color = "green";
        li.style.fontWeight = "bold";

    });
    li.addEventListener("mouseleave", () => {
        li.textContent = li.dataset.original || li.textContent;
        li.style.color = "black";
        li.style.fontWeight = "400";
    });

    // 클릭 시: 삭제 + 하트 + 적립 + 저장
    li.addEventListener("click", () => {
      li.style.height = li.offsetHeight + "px"; // 1) 시작 높이 고정
        li.style.overflow = "hidden"; // 줄어들 때 내용 안 튀게
        li.style.transition = "height .3s ease, opacity .3s ease, margin .3s ease, padding .3s ease";

        // 2) 강제 리플로우로 시작 상태 적용
        li.offsetHeight; 

        // 3) 다음 프레임에 끝값 적용
        requestAnimationFrame(() => {
            li.style.opacity = "0";
            li.style.margin = "0";
            li.style.paddingTop = li.style.paddingBottom = "0";
            li.style.height = "0";
        });

        // 4) 애니메이션 끝난 후 제거
        li.addEventListener("transitionend", (e) => {
            if (e.propertyName === "height") {
                li.remove();
            }
        }, { once: true });

        heartImg.style.display = "block";
        setTimeout(() => { heartImg.style.display = "none"; }, 300);
        
        let money = Number(document.getElementById("money").innerText);
        let newMoney = money + 100;
        document.getElementById("money").innerText = newMoney;
        saveMoney(newMoney);

        saveTodos();
    });
}

// 현재 목록 저장(hover 중이어도 원본으로 저장)
function saveTodos(){
    const items = document.querySelectorAll("#todoList li");
    const todos = Array.from(items).map(li => li.dataset.original || li.textContent);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function saveMoney(amount){
    localStorage.setItem("money", amount);
}