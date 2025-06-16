// 1. TodoItem 컴포넌트를 가져옵니다.
import React from "react";
import TodoItem from "./TodoItem";
import styles from './TodoList.module.css';

// 2. TodoList 컴포넌트를 정의합니다.
// props로 items(할 일 목록), onUpdate(수정 함수), onDelete(삭제 함수)를 받습니다.
function TodoList(props) {
  // items가 undefined나 null인 경우를 대비해 기본값 설정
  const todoItems = Array.isArray(props.items) ? props.items : [];

  // 3. 컴포넌트의 UI를 렌더링합니다.
  return (
    // 3-1. 전체 할 일 목록을 감싸는 컨테이너
    <div className={styles.todoList}>
      <h2 className={styles.listTitle}>{props.listTitle}</h2>
      {todoItems.length === 0 ? (
        <p className={styles.emptyMessage}>{props.emptyMessage}</p>
      ) : (
        // 3-2. 할 일 목록을 표시할 순서 없는 리스트
        <ul className={styles.list}>
          {/* 3-3. items 배열의 각 항목을 TodoItem 컴포넌트로 변환합니다.
              map 함수를 사용하여 배열의 각 요소를 순회하면서 새로운 요소를 생성합니다. */}
          {todoItems.map((item) => (
            // 3-4. 각 할 일 항목을 li 태그로 감싸고, key prop을 지정합니다.
            // React의 리스트 렌더링에서 key는 필수입니다.
            <li key={item.id} className={styles.listItem}>
              {/* 3-5. TodoItem 컴포넌트를 렌더링하고 필요한 props를 전달합니다. */}
              <TodoItem 
                  item={item}           // 현재 할 일 항목 데이터
                  onUpdate={props.onUpdate}    // 수정 함수
                  onDelete={props.onDelete}    // 삭제 함수
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// 4. TodoList 컴포넌트를 내보냅니다.
export default TodoList;