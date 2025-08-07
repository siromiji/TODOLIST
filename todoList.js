      
         
         
            
                
                    
            //페이지 열릴 때 실행되는 함수 
            window.onload = function(){
                const checkNumDiv = document.getElementById("checkMoney");
                const todoInput = document.getElementById("todoInput");
                
                //엔터 키 입력 시 addTodo 호출
                todoInput.addEventListener("keydown", function (event){
                    if (event.key === "Enter"){
                        addTodo();//추가 버튼 대신 호출
                    
                    }
                });

                // 적립급 입력
                checkNumDiv.onclick = function() {
                //현재 적립금 가져오기
                let moneyBasic = Number(document.getElementById("money").innerText);
                //사용자에게 입력받음
                let amount = prompt("사용하시겠습니까?", "100");
                if (amount === null || amount.trim() === "") return;
                
                let  change = Number(amount);//숫자로 변환
                if (isNaN(change)){
                    alert("숫자만 입력해주세요");
                    return;
                    
                }
                
                let newMoney = moneyBasic - change;
                
                document.getElementById("money").innerText= newMoney;
                saveMoney(newMoney);
                
            }
                //1. 저장된 할 일 목록 가져오기
                const saveTodos = JSON.parse(localStorage.getItem("todos")|| "[]");
                saveTodos.forEach(todo =>{
                    createTodoItem(todo);
                });

                //2.저장된 적립금 가져오기
                const saveMoney = localStorage.getItem("money");
                if (saveMoney !== null) {
                    document.getElementById("money").innerText = saveMoney
                }
            }
      
      function addTodo(){
            const input= document.getElementById("todoInput");
            const value = input.value.trim();
            const heartImg = document.getElementById("heartImg");
            const checkNumDiv = document.getElementById("checkMoney")

         



            if(value === ""){
                alert("할 일을 입력해주세요.")
                return;
            }
            const li = document.createElement("li");
            li.textContent = value;

            // 클릭 시 삭제
            li.onclick = function(){
                
                // li 지우기
                li.remove();
                // 하트 나타났다가 숨기기
                heartImg.style.display = "block"
                setTimeout(function(){heartImg.style.display = "none";},300)
                //적립금 100원씩 올리기 
                let money = document.getElementById("money").innerText;
                let moneyUp = Number(money);
                let newMoney = moneyUp + 100; 
                document.getElementById("money").innerText= newMoney
                saveMoney(newMoney) ;
                saveTodos();
            }
 
           
            document.getElementById("todoList").appendChild(li);
            input.value = "";//입력창 비우기
            //저장
            saveTodos();
            function saveTodos(){
                const items = document.querySelectorAll("#todoList li");
                const todos = Array.from(items).map(li => li.textContent);
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            
            
        }
        window.addEventListener('beforeinstallprompt', (e) => {
         e.preventDefault();
          e.prompt(); // 바로 설치 안내 뜨게 함
        });