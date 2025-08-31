import { Memo } from "./types";

const now = new Date();
const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
const mockDB = [
    {
        id: "1",
        title: "Welcome to Memore",
        content: "This is your first memo. Start organizing your thoughts and ideas here!",
        createdAt: lastMonth,
        updatedAt: lastMonth,
    },
    {
        id: "2",
        title: "Shopping List",
        content: "• Milk\n• Bread\n• Eggs\n• Bananas\n• Coffee beans",
        createdAt: yesterday,
        updatedAt: now,
    },
    {
        id: "3",
        title: "Meeting Notes - Q4 Planning",
        content: "Key points from today's meeting:\n- Budget allocation for new features\n- Timeline for product launch\n- Team responsibilities\n- Next steps: Schedule follow-up meeting",
        createdAt: lastWeek,
        updatedAt: yesterday,
    },
    {
        id: "4",
        title: "Ideas for Weekend Trip",
        content: "Places to visit:\n1. Local hiking trail\n2. New restaurant downtown\n3. Art museum\n4. Farmers market\n\nPack: comfortable shoes, camera, snacks",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "5",
        title: "Code Snippet - React Hook",
        content: "```javascript\nconst useLocalStorage = (key, initialValue) => {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n  \n  const setValue = value => {\n    try {\n      setStoredValue(value);\n      window.localStorage.setItem(key, JSON.stringify(value));\n    } catch (error) {\n      console.log(error);\n    }\n  };\n  \n  return [storedValue, setValue];\n};\n```",
        createdAt: lastWeek,
        updatedAt: now,
    },
    {
        id: "6",
        title: "Empty Memo",
        content: "",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "7",
        title: "Very Long Title That Might Cause Layout Issues in the UI Components",
        content: "This memo has a very long title to test how the UI handles overflow and text wrapping. The content is also quite long to test scrolling and layout behavior in different screen sizes.",
        createdAt: yesterday,
        updatedAt: now,
    },
    {
        id: "8",
        title: "Quick Note",
        content: "Call mom tomorrow",
        createdAt: now,
        updatedAt: now,
    },
    {
        id: "9",
        title: "Project Ideas",
        content: "Future project ideas:\n\n1. Recipe manager app\n2. Habit tracker\n3. Personal finance dashboard\n4. Learning progress tracker\n5. Travel planning tool",
        createdAt: lastMonth,
        updatedAt: lastWeek,
    },
    {
        id: "10",
        title: "Special Characters Test",
        content: "Testing special characters: émojis 🎉, symbols ©®™, numbers 123, and unicode: 你好世界",
        createdAt: now,
        updatedAt: now,
    },
];
export function getMockMemos(): Promise<Memo[]> {
    return Promise.resolve(mockDB);
}

// Additional mock data for specific test scenarios
export function getMockMemosForSearch(): Promise<Memo[]> {
    return Promise.resolve([
        {
            id: "search-1",
            title: "React Development",
            content: "Notes about React hooks and components",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "search-2",
            title: "JavaScript Basics",
            content: "React is a JavaScript library for building user interfaces",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "search-3",
            title: "TypeScript Notes",
            content: "TypeScript extends JavaScript with static typing",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
}

export function getMockMemosForSorting(): Promise<Memo[]> {
    const now = new Date();
    return Promise.resolve([
        {
            id: "sort-1",
            title: "Oldest Memo",
            content: "This should appear first when sorted by date",
            createdAt: new Date(2023, 0, 1),
            updatedAt: new Date(2023, 0, 1),
        },
        {
            id: "sort-2",
            title: "Middle Memo",
            content: "This should appear in the middle",
            createdAt: new Date(2023, 6, 15),
            updatedAt: new Date(2023, 6, 15),
        },
        {
            id: "sort-3",
            title: "Newest Memo",
            content: "This should appear last when sorted by date",
            createdAt: now,
            updatedAt: now,
        },
    ]);
}

export function getEmptyMockMemos(): Promise<Memo[]> {
    return Promise.resolve([]);
}

export async function getMemoById(id: string): Promise<Memo> {
    const memo = mockDB.find((memo) => memo.id === id);
    return memo as Memo;
}