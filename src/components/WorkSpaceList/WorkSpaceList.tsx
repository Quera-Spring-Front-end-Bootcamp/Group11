import { useState } from 'react';
import { Button, TextInput, Card } from '../index';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { FieldValues, useForm } from 'react-hook-form';

interface WorkSpace {
  id: number;
  title: string;
  subWorkSpaces: SubWorkSpace[];
}

interface SubWorkSpace {
  id: number;
  title: string;
}

const WorkSpaceList = () => {
  const [workSpaces, setWorkSpaces] = useState<WorkSpace[]>([]);
  const [newWorkSpaceTitle, setNewWorkSpaceTitle] = useState('');
  const [editingWorkSpaceId, setEditingWorkSpaceId] = useState<number | null>(
    null
  );
  const [editingSubWorkSpaceId, setEditingSubWorkSpaceId] = useState<
    number | null
  >(null);
  const [editingSubWorkSpaceValue, setEditingSubWorkSpaceValue] = useState('');

  const handleWorkSpaceTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    workSpaceId: number
  ) => {
    const updatedWorkSpaces = workSpaces.map((workSpace) => {
      if (workSpace.id === workSpaceId) {
        return { ...workSpace, title: event.target.value };
      }
      return workSpace;
    });

    setWorkSpaces(updatedWorkSpaces);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateWorkSpace();
    }
  };

  const handleCreateWorkSpace = () => {
    if (newWorkSpaceTitle.trim() === '') {
      return;
    }

    const newWorkSpace: WorkSpace = {
      id: Date.now(),
      title: newWorkSpaceTitle,
      subWorkSpaces: [],
    };

    setWorkSpaces((prevWorkSpaces) => [...prevWorkSpaces, newWorkSpace]);
    setNewWorkSpaceTitle('');
  };

  const handleCreateSubWorkSpace = (workSpaceId: number) => {
    const subWorkSpaceTitle = window.prompt('Enter subWorkSpace title');
    if (!subWorkSpaceTitle) {
      return;
    }

    const newSubWorkSpace: SubWorkSpace = {
      id: Date.now(),
      title: subWorkSpaceTitle,
    };

    setWorkSpaces((prevWorkSpaces) =>
      prevWorkSpaces.map((workSpace) =>
        workSpace.id === workSpaceId
          ? {
              ...workSpace,
              subWorkSpaces: [...workSpace.subWorkSpaces, newSubWorkSpace],
            }
          : workSpace
      )
    );
  };

  const handleEditWorkSpace = (workSpaceId: number) => {
    setEditingWorkSpaceId(workSpaceId);
  };

  const handleSaveWorkSpace = () => {
    setEditingWorkSpaceId(null);
  };

  const handleEditSubWorkSpace = (
    subWorkSpaceId: number,
    subWorkSpaceValue: string
  ) => {
    setEditingSubWorkSpaceId(subWorkSpaceId);
    setEditingSubWorkSpaceValue(subWorkSpaceValue);
  };

  const handleSaveSubWorkSpace = (
    workSpaceId: number,
    subWorkSpaceId: number
  ) => {
    const updatedWorkSpaces = workSpaces.map((workSpace) => {
      if (workSpace.id === workSpaceId) {
        const updatedSubWorkSpaces = workSpace.subWorkSpaces.map(
          (subWorkSpace) =>
            subWorkSpace.id === subWorkSpaceId
              ? { ...subWorkSpace, title: editingSubWorkSpaceValue }
              : subWorkSpace
        );
        return { ...workSpace, subWorkSpaces: updatedSubWorkSpaces };
      }
      return workSpace;
    });

    setWorkSpaces(updatedWorkSpaces);
    setEditingSubWorkSpaceId(null);
    setEditingSubWorkSpaceValue('');
  };

  const handleDeleteWorkSpace = (workSpaceId: number) => {
    const updatedWorkSpaces = workSpaces.filter(
      (workSpace) => workSpace.id !== workSpaceId
    );
    setWorkSpaces(updatedWorkSpaces);
  };

  const handleDeleteSubWorkSpace = (
    workSpaceId: number,
    subWorkSpaceId: number
  ) => {
    const updatedWorkSpaces = workSpaces.map((workSpace) => {
      if (workSpace.id === workSpaceId) {
        const updatedSubWorkSpaces = workSpace.subWorkSpaces.filter(
          (subWorkSpace) => subWorkSpace.id !== subWorkSpaceId
        );
        return { ...workSpace, subWorkSpaces: updatedSubWorkSpaces };
      }
      return workSpace;
    });

    setWorkSpaces(updatedWorkSpaces);
  };

  const {
    register, //register function will pass to text inputs
  } = useForm<FieldValues>({
    defaultValues: {
      taskDesc: '',
      taskTitleChange: '',
      subWorkSpaceValue: '',
    },
  });

  return (
    <div className='flex flex-col gap-2 bg-slate-200'>
      <Card
        shadow='none'
        padding='xs'
        radius='md'
        className='border-2 p-2'>
        <TextInput
          id='taskDesc'
          register={register}
          placeholder='تسکت چیه عشقم؟'
          value={newWorkSpaceTitle}
          onChange={(event) => setNewWorkSpaceTitle(event.target.value)}
          onKeyPress={handleKeyPress}
          className='mb-5'
        />
        <Button
          variant='filled'
          onClick={handleCreateWorkSpace}>
          تسکو بساز
        </Button>
      </Card>
      {workSpaces.map((workSpace) => (
        <Card
          key={workSpace.id}
          shadow='none'
          padding='xs'
          radius='md'
          className='border-2 flex flex-col gap-2 p-2'>
          {editingWorkSpaceId === workSpace.id ? (
            <TextInput
              id='taskTitleChange'
              register={register}
              value={workSpace.title}
              onChange={(event) =>
                handleWorkSpaceTitleChange(event, workSpace.id)
              }
              autoFocus
            />
          ) : (
            <div className='flex items-center justify-between gap-5 bg-green-100 p-2 rounded-md'>
              <h3 className='font-bold text-xl'>{workSpace.title}</h3>
              <div className='flex gap-3'>
                <FaEdit onClick={() => handleEditWorkSpace(workSpace.id)} />
                <FaTrash onClick={() => handleDeleteWorkSpace(workSpace.id)} />
                <FaPlus
                  onClick={() => handleCreateSubWorkSpace(workSpace.id)}
                />
              </div>
            </div>
          )}
          <div className='flex flex-col gap-3 mr-5'>
            {workSpace.subWorkSpaces.map((subWorkSpace) => (
              <div
                key={subWorkSpace.id}
                className='flex items-center justify-between gap-5 bg-slate-200 p-3 rounded-md'>
                {editingSubWorkSpaceId === subWorkSpace.id ? (
                  <div className='flex gap-2'>
                    <TextInput
                      id='subWorkSpaceValue'
                      register={register}
                      value={editingSubWorkSpaceValue}
                      onChange={(event) =>
                        setEditingSubWorkSpaceValue(event.target.value)
                      }
                      autoFocus
                    />
                    <Button
                      variant='filled'
                      size='xs'
                      onClick={() =>
                        handleSaveSubWorkSpace(workSpace.id, subWorkSpace.id)
                      }>
                      ذخیره
                    </Button>
                  </div>
                ) : (
                  <>
                    {subWorkSpace.title}
                    <div className='flex gap-3'>
                      <FaEdit
                        onClick={() =>
                          handleEditSubWorkSpace(
                            subWorkSpace.id,
                            subWorkSpace.title
                          )
                        }
                      />
                      <FaTrash
                        onClick={() =>
                          handleDeleteSubWorkSpace(
                            workSpace.id,
                            subWorkSpace.id
                          )
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          {editingWorkSpaceId === workSpace.id && (
            <Button
              variant='filled'
              size='xs'
              onClick={handleSaveWorkSpace}>
              ذخیره
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};
export default WorkSpaceList;
