import { useState } from "react";
import { Trophy, ListCheck, FileText, Plus } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Note {
  id: string;
  content: string;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [achievements, setAchievements] = useState({
    taskMaster: false,
    noteKeeper: false,
    perfectionist: false,
  });

  const addTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: "New Task",
      completed: false,
    };
    setTasks([...tasks, newTask]);
    checkAchievements([...tasks, newTask], notes);
  };

  const addNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      content: "New Note",
    };
    setNotes([...notes, newNote]);
    checkAchievements(tasks, [...notes, newNote]);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    checkAchievements(updatedTasks, notes);
  };

  const checkAchievements = (currentTasks: Task[], currentNotes: Note[]) => {
    const completedTasks = currentTasks.filter(t => t.completed).length;
    
    if (completedTasks >= 5 && !achievements.taskMaster) {
      setAchievements(prev => ({ ...prev, taskMaster: true }));
      toast({
        title: "Achievement Unlocked!",
        description: "Task Master: Complete 5 tasks",
      });
    }

    if (currentNotes.length >= 3 && !achievements.noteKeeper) {
      setAchievements(prev => ({ ...prev, noteKeeper: true }));
      toast({
        title: "Achievement Unlocked!",
        description: "Note Keeper: Create 3 notes",
      });
    }

    if (completedTasks >= 10 && currentNotes.length >= 5 && !achievements.perfectionist) {
      setAchievements(prev => ({ ...prev, perfectionist: true }));
      toast({
        title: "Achievement Unlocked!",
        description: "Perfectionist: Master of tasks and notes",
      });
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-8">
      {/* Header with Achievements */}
      <header className="header-section">
        <div className="flex justify-center gap-4 mb-8">
          <div className={`achievement-badge ${achievements.taskMaster ? 'opacity-100' : 'opacity-50'}`}>
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <div className={`achievement-badge ${achievements.noteKeeper ? 'opacity-100' : 'opacity-50'}`}>
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <div className={`achievement-badge ${achievements.perfectionist ? 'opacity-100' : 'opacity-50'}`}>
            <ListCheck className="w-8 h-8 text-primary" />
          </div>
        </div>
      </header>

      {/* Tasks Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Tasks</h2>
          <button onClick={addTask} className="mystic-button">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-4">
          {tasks.map(task => (
            <div key={task.id} className="task-card">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="w-5 h-5 rounded border-primary/50 text-primary bg-transparent"
                />
                <span className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                  {task.title}
                </span>
              </label>
            </div>
          ))}
        </div>
      </section>

      {/* Notes Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Notes</h2>
          <button onClick={addNote} className="mystic-button">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="grid gap-4">
          {notes.map(note => (
            <div key={note.id} className="note-container">
              <textarea
                defaultValue={note.content}
                className="w-full bg-transparent border-none focus:outline-none resize-none"
                rows={3}
              />
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-section">
        <div className="text-center text-sm text-muted-foreground">
          Keep tracking your progress!
        </div>
      </footer>
    </div>
  );
};

export default Index;