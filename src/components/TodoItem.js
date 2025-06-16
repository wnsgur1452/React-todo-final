import React from 'react';
import styles from './TodoItem.module.css';

// 1. TodoItem 컴포넌트 정의: 개별 할 일 항목을 표시하는 컴포넌트입니다.
// props로 item(할 일 데이터), onDelete(삭제 함수), onUpdate(수정 함수)를 받습니다.
function TodoItem(props){

    // 2. 삭제 기능을 처리하는 함수입니다.
    // 사용자가 삭제 버튼을 클릭하면 호출됩니다.
    const handleDelete = () => {
        props.onDelete(props.item.id);
    };

    // 3. 수정 기능을 처리하는 함수입니다.
    // 사용자가 수정 버튼을 클릭하면 호출됩니다.
    const handleUpdate = () => {
        // 3-1. prompt 창을 띄워 사용자로부터 새로운 텍스트를 입력받습니다.
        // 기본값으로 현재 할 일 텍스트를 보여줍니다.
        const newText = prompt('새로운 할 일을 입력하세요:', props.item.text);

        // 3-2. 사용자가 취소 버튼을 클릭한 경우 (null 반환)
        if (newText === null) {
            return; // 함수를 종료하고 아무 변경도 하지 않습니다.
        }

        // 3-3. 입력값이 비어있는지 검사합니다.
        if (!newText|| !newText.trim()) {
            alert("할 일을 입력해주세요.");
            return;
        }

        // 3-4. props로 받은 onUpdate 함수를 호출하여 새로운 텍스트로 업데이트합니다.
        props.onUpdate(props.item.id, { text: newText.trim() });
    } 

    // 4. 완료 상태 토글 기능을 처리하는 함수입니다.
    // 체크박스 상태가 변경될 때 호출됩니다.
    const handleToggle = () => {
        // 4-1. 현재 완료 상태의 반대값을 계산합니다.
        const newCompleted = !props.item.completed;
        // 4-2. props로 받은 onUpdate 함수를 호출하여 완료 상태를 업데이트합니다.
        props.onUpdate(props.item.id, { completed: newCompleted });
    }

    // 5. 컴포넌트의 UI를 렌더링합니다.
    return (
        // 5-1. 할 일 항목을 감싸는 div 컨테이너
        <div className={styles.todoItem}>
            {/* 5-2. 할 일 텍스트를 표시합니다. */}
            <input
                type="checkbox"
                checked={props.item.completed}
                onChange={handleToggle}
                className={styles.checkbox}
            />            <div className={styles.todoContent}>
                <span className={`${styles.todoText} ${props.item.completed ? styles.completed : styles.incomplete}`}>
                    {props.item.text}
                </span>
            </div>
            <div className={styles.todoActions}>
                <span className={`${styles.status} ${props.item.completed ? styles.completed : styles.incomplete}`}>
                    {props.item.completed ? '완료' : '미완료'}
                </span>
                {/* 5-5. 수정 버튼입니다. */}
                <button
                    onClick={handleUpdate}
                    className={`${styles.button} ${styles.editButton}`}
                >
                    수정
                </button>
                {/* 5-6. 삭제 버튼입니다. */}
                <button
                    onClick={handleDelete}
                    className={`${styles.button} ${styles.deleteButton}`}
                >
                    삭제
                </button>
            </div>
        </div>
    )
}

// 6. TodoItem 컴포넌트를 내보냅니다.
export default TodoItem;