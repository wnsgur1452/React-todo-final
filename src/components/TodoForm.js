/**
 * [TodoForm 컴포넌트]
 * 새로운 할 일을 입력받고 추가하는 폼 컴포넌트입니다.
 * 
 * 데이터 흐름:
 * 1. 사용자 입력 → newTodoText 상태 업데이트
 * 2. 폼 제출 → handleSubmit → props.onAdd 호출
 * 3. App 컴포넌트의 todos 상태 업데이트
 */

// 1. [초기 설정]
// 1-1. React와 필요한 훅을 임포트합니다.
import React from 'react';
import { useState } from 'react';
// 1-2. CSS 모듈을 임포트합니다.
import styles from './TodoForm.module.css';

// 2. [컴포넌트 정의]
// 2-1. TodoForm 컴포넌트를 정의하고 props로 onAdd 함수를 받습니다.
function TodoForm(props){
    // 3. [상태 관리]
    // 3-1. 입력창의 값을 관리할 상태를 생성합니다.
    const [newTodoText, setNewTodoText] = useState('');
    
    // 4. [이벤트 핸들러]
    // 4-1. 입력값 변경 처리 함수
    function handleChange(event) {
        // event.target.value로 입력된 새로운 값을 가져와 상태를 업데이트합니다.
        setNewTodoText(event.target.value);
    }
    
    // 4-2. 폼 제출 처리 함수
    function handleSubmit(event) {
        // 4-2-1. 브라우저의 기본 폼 제출 동작을 방지합니다.
        event.preventDefault();
        
        // 4-2-2. 새로운 할 일 객체를 생성합니다.
        const data = {
            text: newTodoText.trim(),  // 앞뒤 공백을 제거한 입력 텍스트
            completed: false           // 초기 완료 상태는 false로 설정
        }
          // 4-2-3. props로 전달받은 onAdd 함수를 호출하여 새 할 일을 추가합니다.
        props.onAdd(data);

        // 4-2-4. 입력창을 초기화하여 다음 입력을 준비합니다.
        setNewTodoText('');
    }
      // 5. [UI 렌더링]
    return (
        // 5-1. 폼 컨테이너
        <div className={styles.todoForm}>
            {/* 5-2. 폼 엘리먼트: submit 이벤트를 handleSubmit 함수와 연결 */}
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 5-3. 할 일 입력 필드: 사용자 입력을 받는 텍스트 입력창 */}
                <input
                    className={styles.input}
                    type="text"
                    value={newTodoText}         // 현재 입력값을 상태와 연결
                    onChange={handleChange}      // 입력값 변경 이벤트 처리
                    placeholder="할 일을 입력하세요"
                    aria-label="새로운 할 일"     // 접근성 레이블
                />
                {/* 5-4. 추가 버튼: 폼 제출을 트리거 */}
                <button 
                    className={styles.button}
                    type="submit"
                >
                    추가
                </button>
            </form>
        </div>
    )
}

// 7. TodoForm 컴포넌트를 내보냅니다.
export default TodoForm;