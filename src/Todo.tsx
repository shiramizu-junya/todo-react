import { useState } from 'react';
import './styles.css';

export const Todo = () => {
  /** 入力フォームのState管理 */
  const [todoText, setTodoText] = useState('');
  /** 未完了TODOのState管理 */
  const [inCompleteTodos, setInCompleteTodos] = useState<string[]>([]);
  /** 完了TODOのState管理 */
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  /** 入力フォームのイベントメソッド */
  const onChangeTodoText = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTodoText(e.target.value);
  }

  /** 追加ボタンのイベントメソッド */
  const onClickAdd = () => {
    if(!todoText) return;
    const newTodos = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText('');
  }

  const onClickDelete = (index: number) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  }

  const onClickComplete = (index: number) => {
    const newInCompleteTodos = [...inCompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newInCompleteTodos);
  }

  const onClickRollback = (index: number) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newInCompleteTodos = [...inCompleteTodos, completeTodos[index]];

    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newInCompleteTodos);
  }

  return (
    <>
      <div className='input-area'>
        <input placeholder='TODOを入力' value={todoText} onChange={onChangeTodoText}></input>
        <button onClick={onClickAdd}>追加</button>
      </div>
      {/* 未完了のTODO表示 */}
      <div className='incomplete-area'>
        <p className='title'>未完了のTODO</p>
        <ul>
          {/* @todo idを一意にする */}
          { inCompleteTodos.map((todo, index) =>
             (
              <li key={ todo }>
                <div className='list-row'>
                  <p className='todo-item'>{ todo }</p>
                  <button onClick={() => onClickComplete(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
            )
          ) }
        </ul>
      </div>
      {/* 完了のTODO表示 */}
      <div className='complete-area'>
        <p className='title'>完了のTODO</p>
        <ul>
          { completeTodos.map((todo, index) => (
            <li key={todo}>
              <div className='list-row'>
                <p className='todo-item'>{ todo }</p>
                <button onClick={() => onClickRollback(index)}>戻す</button>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </>
  )
}
