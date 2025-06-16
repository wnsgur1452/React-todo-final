// 1. 필요한 React 기능들을 가져옵니다.
import React from 'react';
import { useState } from 'react'; // useState 훅을 사용하여 상태를 관리합니다.
import styles from './TodoForm.module.css';

// 2. TodoForm 컴포넌트를 정의합니다.
// props로 onAdd 함수를 받아 새로운 할 일을 추가할 수 있습니다.
function TodoForm(props){
    // 3. 입력창의 값을 관리하기 위한 상태를 생성합니다.
    // newTodoText: 현재 입력값을 저장
    // setNewTodoText: 입력값을 업데이트하는 함수
    const [newTodoText, setNewTodoText] = useState('');
    
    // 4. 입력창의 값이 변경될 때마다 실행되는 함수입니다.
    function handleChange(event) {
        // 4-1. 입력창에 입력된 새로운 값으로 상태를 업데이트합니다.
        setNewTodoText(event.target.value);
    }
    
    // 5. 폼이 제출될 때 실행되는 함수입니다.
    function handleSubmit(event) {
        // 5-1. 폼의 기본 제출 동작을 방지합니다.
        event.preventDefault();
        
        // 5-2. 새로운 할 일 객체를 생성합니다.
        const data = {
            text: newTodoText,      // 입력된 텍스트
            id: Date.now(),         // 현재 시간값을 고유 ID로 사용
            completed: false        // 초기 완료 상태는 false
        }
        
        // 5-3. props로 전달받은 onAdd 함수를 호출하여 새 할 일을 추가합니다.
        props.onAdd(data);

        // 5-4. 입력창을 초기화합니다.
        setNewTodoText('');
    }
    
    // 6. 컴포넌트의 UI를 렌더링합니다.
    return (
        <div className={styles.todoForm}>
            {/* 6-1. 폼 엘리먼트: submit 이벤트를 처리합니다. */}
            <form className={styles.form} onSubmit={handleSubmit}>
                {/* 6-2. 텍스트 입력창 */}
                <input
                    className={styles.input}
                    type="text"
                    value={newTodoText}          // 현재 상태값
                    onChange={handleChange}       // 값이 변경될 때 실행할 함수
                    placeholder="할 일을 입력하세요"
                />
                {/* 6-3. 제출 버튼 */}
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