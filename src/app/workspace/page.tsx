"use client";

import { useState } from "react";
import { 
  DollarSign, Users, Award, Briefcase, Clock, CheckSquare, 
  Image as ImageIcon, UserCheck, Camera, Globe, Plus, Trash2, 
  Check, Heart, Sparkles, AlertCircle, Edit, Calendar, MapPin
} from "lucide-react";

// Standard categories
const BUDGET_CATEGORIES = ["Venue & Catering", "Photography", "Attire", "Flowers & Decor", "Music & Entertainment", "Other"];

export default function WorkspacePage() {
  const [activeTab, setActiveTab] = useState("budget");

  // 1. Budget State
  const [totalBudget, setTotalBudget] = useState(35000);
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Romantic Garden Venue Rental", amount: 12000, category: "Venue & Catering" },
    { id: 2, name: "Luxury Buffet & Open Bar", amount: 8500, category: "Venue & Catering" },
    { id: 3, name: "Fine Art Photography Package", amount: 4500, category: "Photography" },
    { id: 4, name: "Bridal Gown & Groom Tuxedo", amount: 3200, category: "Attire" },
  ]);
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [newExpenseCat, setNewExpenseCat] = useState("Venue & Catering");

  // 2. Guest List State
  const [guests, setGuests] = useState([
    { id: 1, name: "Emma Watson", rsvp: "Attending", diet: "Vegetarian", plusOnes: 1 },
    { id: 2, name: "Tom Hanks", rsvp: "Pending", diet: "None", plusOnes: 0 },
    { id: 3, name: "Lady Gaga", rsvp: "Attending", diet: "Gluten-Free", plusOnes: 2 },
    { id: 4, name: "Brad Pitt", rsvp: "Declined", diet: "None", plusOnes: 0 },
  ]);
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestRsvp, setNewGuestRsvp] = useState("Pending");
  const [newGuestDiet, setNewGuestDiet] = useState("");
  const [newGuestPlusOnes, setNewGuestPlusOnes] = useState("0");

  // 3. Checklist State
  const [tasks, setTasks] = useState([
    { id: 1, text: "Finalize guest count", checked: false, timeframe: "3 Months Before" },
    { id: 2, text: "Send official invitations", checked: true, timeframe: "6 Months Before" },
    { id: 3, text: "Book catering tasting", checked: true, timeframe: "6 Months Before" },
    { id: 4, text: "Confirm day-of schedule", checked: false, timeframe: "1 Month Before" },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskTimeframe, setNewTaskTimeframe] = useState("3 Months Before");

  // 4. Seating Chart State
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1 (Head Table)", seats: ["Emma Watson", "Lady Gaga"], capacity: 6 },
    { id: 2, name: "Table 2 (Family)", seats: ["Tom Hanks"], capacity: 8 },
  ]);
  const [newTableName, setNewTableName] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("8");
  const [selectedTableId, setSelectedTableId] = useState(1);
  const [assignGuestName, setAssignGuestName] = useState("");

  // 5. Vendor Manager State
  const [vendors, setVendors] = useState([
    { id: 1, name: "Rosewood Gardens", role: "Venue & Catering", contact: "events@rosewood.com", status: "Booked", cost: 12000 },
    { id: 2, name: "Lumiere Studios", role: "Photography", contact: "hello@lumiere.com", status: "Proposal Signed", cost: 4500 },
    { id: 3, name: "Sweet Harmonies Band", role: "Entertainment", contact: "booking@harmonies.com", status: "Negotiating", cost: 3000 },
  ]);
  const [vendorName, setVendorName] = useState("");
  const [vendorRole, setVendorRole] = useState("Venue & Catering");
  const [vendorContact, setVendorContact] = useState("");
  const [vendorCost, setVendorCost] = useState("");

  // 6. Day Timeline State
  const [timelineEvents, setTimelineEvents] = useState([
    { id: 1, time: "09:00 AM", event: "Bridesmaids & Bride Hair and Makeup Setup" },
    { id: 2, time: "11:30 AM", event: "Groom and Groomsmen Photos in Garden" },
    { id: 3, time: "02:00 PM", event: "Official Wedding Ceremony & Vow Exchange" },
    { id: 4, time: "03:30 PM", event: "Cocktail Hour & Outdoor String Quartet" },
    { id: 5, time: "06:00 PM", event: "Grand Reception Entrance & First Dance" },
  ]);
  const [newTime, setNewTime] = useState("");
  const [newEventText, setNewEventText] = useState("");

  // 7. Inspiration Board State
  const [inspirations, setInspirations] = useState([
    { id: 1, title: "Garden Arch Roses", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600" },
    { id: 2, title: "Champagne Glass Towers", url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600" },
    { id: 3, title: "Burgundy Table Setting", url: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=600" },
  ]);
  const [inspTitle, setInspTitle] = useState("");
  const [inspUrl, setInspUrl] = useState("");

  // 8. Wedding Crew State
  const [crew, setCrew] = useState([
    { id: 1, name: "Sophia Miller", role: "Maid of Honor", task: "Coordinate bridal dress styling" },
    { id: 2, name: "Liam Anderson", role: "Best Man", task: "Hold rings & deliver reception toast" },
    { id: 3, name: "Olivia Johnson", role: "CoordinatorHelper", task: "Direct florist to the altar setup" },
  ]);
  const [crewName, setCrewName] = useState("");
  const [crewRole, setCrewRole] = useState("Maid of Honor");
  const [crewTask, setCrewTask] = useState("");

  // 9. Photo Gallery State (Mock Upload)
  const [gallery, setGallery] = useState([
    { id: 1, url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=600", desc: "Engagement Announcement Shot" },
    { id: 2, url: "https://images.unsplash.com/photo-1519225495810-7517c300ea64?q=80&w=600", desc: "Tasting cake selections" },
  ]);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");

  // 10. Public Site State
  const [publicSite, setPublicSite] = useState({
    title: "Emma & Liam's EverAfter",
    banner: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200",
    date: "December 18, 2026",
    venue: "Rosewood Estate Gardens",
    registryLink: "https://zola.com/registry/emma-liam",
    story: "We met in a cozy bookstore in Paris and spent three days walking under the autumn leaves. Six years later, we are thrilled to begin our greatest chapter yet."
  });
  const [editSiteTitle, setEditSiteTitle] = useState(publicSite.title);
  const [editSiteDate, setEditSiteDate] = useState(publicSite.date);
  const [editSiteVenue, setEditSiteVenue] = useState(publicSite.venue);
  const [editSiteStory, setEditSiteStory] = useState(publicSite.story);

  // Dynamic calculations
  const totalSpent = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetPercentage = Math.min((totalSpent / totalBudget) * 100, 100);

  const guestCount = guests.reduce((acc, g) => acc + 1 + g.plusOnes, 0);
  const attendingCount = guests.filter(g => g.rsvp === "Attending").reduce((acc, g) => acc + 1 + g.plusOnes, 0);
  const pendingCount = guests.filter(g => g.rsvp === "Pending").reduce((acc, g) => acc + 1 + g.plusOnes, 0);

  // Helpers
  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpenseName || !newExpenseAmount) return;
    setExpenses(prev => [
      ...prev,
      { id: Date.now(), name: newExpenseName, amount: Number(newExpenseAmount), category: newExpenseCat }
    ]);
    setNewExpenseName("");
    setNewExpenseAmount("");
  };

  const deleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const addGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName) return;
    setGuests(prev => [
      ...prev,
      { id: Date.now(), name: newGuestName, rsvp: newGuestRsvp, diet: newGuestDiet || "None", plusOnes: Number(newGuestPlusOnes) }
    ]);
    setNewGuestName("");
    setNewGuestDiet("");
    setNewGuestPlusOnes("0");
  };

  const deleteGuest = (id: number) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: newTaskText, checked: false, timeframe: newTaskTimeframe }
    ]);
    setNewTaskText("");
  };

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const addTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName) return;
    setTables(prev => [
      ...prev,
      { id: Date.now(), name: newTableName, seats: [], capacity: Number(newTableCapacity) }
    ]);
    setNewTableName("");
  };

  const assignGuestToTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignGuestName) return;
    setTables(prev => prev.map(t => {
      if (t.id === selectedTableId) {
        if (t.seats.length >= t.capacity) return t; // Table Full
        return { ...t, seats: [...t.seats, assignGuestName] };
      }
      return t;
    }));
    setAssignGuestName("");
  };

  const unseatGuest = (tableId: number, name: string) => {
    setTables(prev => prev.map(t => {
      if (t.id === tableId) {
        return { ...t, seats: t.seats.filter(s => s !== name) };
      }
      return t;
    }));
  };

  const addVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName || !vendorContact) return;
    setVendors(prev => [
      ...prev,
      { id: Date.now(), name: vendorName, role: vendorRole, contact: vendorContact, status: "Negotiating", cost: Number(vendorCost) || 0 }
    ]);
    setVendorName("");
    setVendorContact("");
    setVendorCost("");
  };

  const addTimelineEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTime || !newEventText) return;
    setTimelineEvents(prev => [
      ...prev,
      { id: Date.now(), time: newTime, event: newEventText }
    ].sort((a, b) => a.time.localeCompare(b.time)));
    setNewTime("");
    setNewEventText("");
  };

  const addInspiration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inspTitle || !inspUrl) return;
    setInspirations(prev => [
      ...prev,
      { id: Date.now(), title: inspTitle, url: inspUrl }
    ]);
    setInspTitle("");
    setInspUrl("");
  };

  const addCrew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!crewName || !crewTask) return;
    setCrew(prev => [
      ...prev,
      { id: Date.now(), name: crewName, role: crewRole, task: crewTask }
    ]);
    setCrewName("");
    setCrewTask("");
  };

  const addPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryUrl) return;
    setGallery(prev => [
      ...prev,
      { id: Date.now(), url: galleryUrl, desc: galleryDesc || "Uploaded Memory" }
    ]);
    setGalleryUrl("");
    setGalleryDesc("");
  };

  const savePublicSite = (e: React.FormEvent) => {
    e.preventDefault();
    setPublicSite(prev => ({
      ...prev,
      title: editSiteTitle,
      date: editSiteDate,
      venue: editSiteVenue,
      story: editSiteStory
    }));
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 pb-6 border-b border-stone-250 dark:border-stone-850">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 flex items-center">
            <Heart className="h-7 w-7 text-rose-500 fill-rose-500/20 mr-2" />
            Couple Workspace
          </h1>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-light mt-1">
            Plan, synchronize, and draft every step of your magical celebration.
          </p>
        </div>
        
        {/* Workspace Alert */}
        <div className="inline-flex items-center space-x-2 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/40 rounded-full px-4 py-1.5 text-xs font-medium">
          <Sparkles className="h-4 w-4 text-gold-500" />
          <span>Local Sandbox Enabled</span>
        </div>
      </div>

      <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* SIDEBAR NAVIGATION GRID */}
        <aside className="w-full lg:w-64 shrink-0 rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-900 shadow-md">
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: "budget", label: "Budget Planner", icon: DollarSign },
              { id: "guests", label: "Guest List", icon: Users },
              { id: "checklist", label: "Wedding Checklist", icon: CheckSquare },
              { id: "seating", label: "Seating Chart", icon: Award },
              { id: "vendors", label: "Vendors Manager", icon: Briefcase },
              { id: "timeline", label: "Day Timeline", icon: Clock },
              { id: "inspiration", label: "Inspiration Board", icon: ImageIcon },
              { id: "crew", label: "Wedding Crew", icon: UserCheck },
              { id: "gallery", label: "Photo Gallery", icon: Camera },
              { id: "publicsite", label: "Public Site", icon: Globe },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2.5 px-3 py-2 text-sm font-semibold rounded-xl whitespace-nowrap transition-all ${
                    isActive 
                      ? "bg-rose-500 text-white shadow-md shadow-rose-500/10" 
                      : "text-stone-600 hover:bg-stone-100 hover:text-rose-500 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-rose-400"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ACTIVE MODULE CONTAINER */}
        <div className="flex-grow w-full rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900 shadow-md min-h-[500px]">
          
          {/* TAB 1: BUDGET MODULE */}
          {activeTab === "budget" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center">
                  <DollarSign className="mr-2 text-rose-500" />
                  Budget Allocator & Estimator
                </h2>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-bold block">
                    Total Budget
                  </span>
                  <span className="font-serif text-2xl font-extrabold text-stone-800 dark:text-white">
                    ${totalBudget.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Budget Progress Meter */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-rose-100/50 bg-rose-50/10 dark:border-stone-800/80 dark:bg-stone-950/20">
                  <span className="text-xs text-stone-400 font-medium">Spent to Date</span>
                  <h3 className="font-serif font-bold text-xl text-rose-700 dark:text-rose-400 mt-1">
                    ${totalSpent.toLocaleString()}
                  </h3>
                </div>
                <div className="p-4 rounded-xl border border-stone-200/50 bg-stone-50/50 dark:border-stone-850 dark:bg-stone-950/40">
                  <span className="text-xs text-stone-400 font-medium">Remaining Balances</span>
                  <h3 className={`font-serif font-bold text-xl mt-1 ${remainingBudget < 0 ? "text-red-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                    ${remainingBudget.toLocaleString()}
                  </h3>
                </div>
                <div className="p-4 rounded-xl border border-stone-200/50 bg-stone-50/50 dark:border-stone-850 dark:bg-stone-950/40">
                  <span className="text-xs text-stone-400 font-medium">Budget Depletion</span>
                  <div className="mt-2.5 h-2 w-full rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-rose-500 to-rose-700 transition-all duration-500" 
                      style={{ width: `${budgetPercentage}%` }} 
                    />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 mt-1 block tracking-wider">
                    {budgetPercentage.toFixed(0)}% Allocated
                  </span>
                </div>
              </div>

              {/* Add Expense Form */}
              <form onSubmit={addExpense} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Expense Description</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Florist, Catering Deposit"
                    value={newExpenseName}
                    onChange={(e) => setNewExpenseName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Amount ($)</label>
                  <input
                    type="number"
                    required
                    placeholder="Cost"
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Log Expense
                  </button>
                </div>
              </form>

              {/* Expense Table List */}
              <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-full divide-y text-left text-xs">
                  <thead className="bg-stone-50 dark:bg-stone-950">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Item</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Cost</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {expenses.map(exp => (
                      <tr key={exp.id}>
                        <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-200">{exp.name}</td>
                        <td className="px-4 py-3 font-mono font-bold">${exp.amount.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteExpense(exp.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: GUEST LIST MODULE */}
          {activeTab === "guests" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center">
                  <Users className="mr-2 text-rose-500" />
                  RSVP & Guest Tracker
                </h2>
                <div className="text-right text-xs">
                  <span className="text-[10px] uppercase font-bold text-stone-400">Total Counted Guests</span>
                  <p className="font-serif text-xl font-extrabold text-stone-800 dark:text-white">{guestCount}</p>
                </div>
              </div>

              {/* RSVP Analytics */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-200/50 text-emerald-800 dark:text-emerald-400">
                  <span className="text-[10px] uppercase font-bold block">Attending</span>
                  <span className="text-xl font-extrabold">{attendingCount}</span>
                </div>
                <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-200/50 text-amber-800 dark:text-amber-400">
                  <span className="text-[10px] uppercase font-bold block">Pending</span>
                  <span className="text-xl font-extrabold">{pendingCount}</span>
                </div>
                <div className="p-3 bg-stone-100 rounded-xl border text-stone-600 dark:bg-stone-950/20 dark:text-stone-400">
                  <span className="text-[10px] uppercase font-bold block">Declined</span>
                  <span className="text-xl font-extrabold">{guests.filter(g => g.rsvp === "Declined").length}</span>
                </div>
              </div>

              {/* Add Guest Form */}
              <form onSubmit={addGuest} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Guest Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert De Niro"
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">RSVP Status</label>
                  <select
                    value={newGuestRsvp}
                    onChange={(e) => setNewGuestRsvp(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Attending">Attending</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-rose-800 dark:text-rose-400 block mb-1">Dietary Requirements</label>
                  <input
                    type="text"
                    placeholder="e.g. Vegetarian, None"
                    value={newGuestDiet}
                    onChange={(e) => setNewGuestDiet(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full inline-flex h-9 items-center justify-center rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Register Guest
                  </button>
                </div>
              </form>

              {/* Guest Directory List */}
              <div className="overflow-x-auto border rounded-xl">
                <table className="min-w-full divide-y text-left text-xs">
                  <thead className="bg-stone-50 dark:bg-stone-950">
                    <tr>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Name</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">RSVP</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Diet</th>
                      <th className="px-4 py-3 font-semibold uppercase tracking-wider text-stone-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {guests.map(g => (
                      <tr key={g.id}>
                        <td className="px-4 py-3 font-medium text-stone-800 dark:text-stone-200">{g.name}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            g.rsvp === "Attending" 
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                              : g.rsvp === "Pending"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                              : "bg-stone-100 text-stone-800 dark:bg-stone-950/40 dark:text-stone-400"
                          }`}>
                            {g.rsvp}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-stone-500 dark:text-stone-400">{g.diet}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => deleteGuest(g.id)}
                            className="text-stone-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CHECKLIST MODULE */}
          {activeTab === "checklist" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center">
                  <CheckSquare className="mr-2 text-rose-500" />
                  Wedding Day Checklist
                </h2>
                <span className="text-xs text-stone-400 font-medium">
                  {tasks.filter(t => t.checked).length} of {tasks.length} Completed
                </span>
              </div>

              {/* Add Task Form */}
              <form onSubmit={addTask} className="flex space-x-2 bg-stone-50 dark:bg-stone-950/40 p-4 rounded-xl border">
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule bridal hair trial"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  className="flex-grow text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950 dark:text-white"
                />
                <button
                  type="submit"
                  className="inline-flex h-9 items-center justify-center rounded-lg bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 dark:bg-rose-600 dark:hover:bg-rose-500 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </button>
              </form>

              {/* Task Items list */}
              <ul className="space-y-2">
                {tasks.map(t => (
                  <li 
                    key={t.id}
                    className={`flex items-center justify-between rounded-xl p-3 border.5 transition-all ${
                      t.checked 
                        ? "bg-rose-50/20 border-rose-100/30 line-through text-stone-400 dark:bg-stone-950/20 dark:border-stone-850/40" 
                        : "bg-white border-stone-200 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => toggleTask(t.id)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                          t.checked 
                            ? "bg-rose-500 border-rose-500 text-white" 
                            : "border-stone-300 hover:border-rose-500 dark:border-stone-700"
                        }`}
                      >
                        {t.checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </button>
                      <span className="text-sm font-medium">{t.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 4: SEATING CHART */}
          {activeTab === "seating" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <Award className="mr-2 text-rose-500" />
                Seating Chart Coordinators
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Table Details */}
                <div className="space-y-4">
                  <h3 className="font-serif font-bold text-lg text-stone-700 dark:text-stone-300">
                    Tables List
                  </h3>

                  <form onSubmit={addTable} className="flex space-x-2">
                    <input
                      type="text"
                      required
                      placeholder="Table Name (e.g. Table 3)"
                      value={newTableName}
                      onChange={(e) => setNewTableName(e.target.value)}
                      className="flex-grow text-xs rounded-lg border border-stone-200 px-3.5 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    />
                    <button type="submit" className="rounded-lg bg-stone-900 text-white px-3 text-xs font-semibold dark:bg-rose-600">
                      <Plus className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="space-y-2">
                    {tables.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setSelectedTableId(t.id)}
                        className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                          selectedTableId === t.id
                            ? "bg-rose-50/20 border-rose-500 text-rose-800 dark:bg-stone-950/40 dark:text-rose-400"
                            : "bg-white border-stone-200 text-stone-700 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300"
                        }`}
                      >
                        <span className="text-sm font-semibold">{t.name}</span>
                        <span className="text-xs bg-stone-100 dark:bg-stone-950 px-2.5 py-0.5 rounded-full font-mono text-stone-500">
                          {t.seats.length} / {t.capacity} Seats
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table Seating Assignment Panel */}
                <div className="p-4 bg-stone-50 dark:bg-stone-950/40 border rounded-2xl space-y-4">
                  <h3 className="font-serif font-bold text-lg text-stone-700 dark:text-stone-300">
                    Assign Guests to {tables.find(t => t.id === selectedTableId)?.name || "Table"}
                  </h3>

                  <form onSubmit={assignGuestToTable} className="flex space-x-2">
                    <select
                      value={assignGuestName}
                      onChange={(e) => setAssignGuestName(e.target.value)}
                      className="flex-grow text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    >
                      <option value="">-- Choose Guest --</option>
                      {guests
                        .filter(g => g.rsvp === "Attending")
                        .map(g => (
                          <option key={g.id} value={g.name}>{g.name}</option>
                        ))}
                    </select>
                    <button type="submit" className="rounded-lg bg-stone-900 text-white px-4 text-xs font-semibold dark:bg-rose-600">
                      Assign
                    </button>
                  </form>

                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400">
                      Seated Guests
                    </h4>
                    {tables.find(t => t.id === selectedTableId)?.seats.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">No guests seated here yet.</p>
                    ) : (
                      <ul className="space-y-1">
                        {tables.find(t => t.id === selectedTableId)?.seats.map((s, idx) => (
                          <li key={idx} className="flex items-center justify-between text-xs bg-white dark:bg-stone-900 p-2 rounded-lg border">
                            <span>{s}</span>
                            <button
                              onClick={() => unseatGuest(selectedTableId, s)}
                              className="text-stone-400 hover:text-red-500"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VENDORS MANAGER */}
          {activeTab === "vendors" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <Briefcase className="mr-2 text-rose-500" />
                Vendor Profiles & Proposals
              </h2>

              <form onSubmit={addVendor} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-rose-800 dark:text-rose-400">Vendor Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumiere DJ"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-rose-800 dark:text-rose-400">Role/Service</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Photography"
                    value={vendorRole}
                    onChange={(e) => setVendorRole(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider block mb-1 text-rose-800 dark:text-rose-400">Cost ($)</label>
                  <input
                    type="number"
                    placeholder="Price Tag"
                    value={vendorCost}
                    onChange={(e) => setVendorCost(e.target.value)}
                    className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full rounded-lg bg-stone-900 text-white h-9 text-xs font-semibold dark:bg-rose-600">
                    <Plus className="h-4 w-4 mr-1 inline" /> Log Vendor
                  </button>
                </div>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vendors.map(v => (
                  <div key={v.id} className="p-4 rounded-xl border border-stone-200 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-serif font-bold text-lg text-stone-800 dark:text-stone-100">{v.name}</h3>
                        <span className="text-[10px] uppercase font-bold text-gold-600 dark:text-gold-400">{v.role}</span>
                      </div>
                      <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-stone-500">
                        {v.status}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-light font-mono">Mail: {v.contact}</p>
                    <p className="text-xs font-semibold">Estimated Budget: ${v.cost.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: TIMELINE MODULE */}
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <Clock className="mr-2 text-rose-500" />
                Wedding Day Timeline Schedule
              </h2>

              <form onSubmit={addTimelineEvent} className="flex space-x-2 bg-stone-50 dark:bg-stone-950/40 p-4 rounded-xl border">
                <input
                  type="text"
                  required
                  placeholder="e.g. 02:00 PM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-24 text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <input
                  type="text"
                  required
                  placeholder="Event description (e.g. Champagne reception opens)"
                  value={newEventText}
                  onChange={(e) => setNewEventText(e.target.value)}
                  className="flex-grow text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <button type="submit" className="rounded-lg bg-stone-900 text-white px-4 text-xs font-semibold dark:bg-rose-600">
                  Add Event
                </button>
              </form>

              <div className="relative border-l border-rose-200 ml-4 space-y-6 pt-4 dark:border-stone-800">
                {timelineEvents.map(ev => (
                  <div key={ev.id} className="relative pl-6">
                    <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-rose-500 bg-white dark:bg-stone-950" />
                    <span className="font-mono text-xs font-bold text-rose-700 dark:text-rose-400 block">{ev.time}</span>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mt-0.5">{ev.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: INSPIRATION BOARD */}
          {activeTab === "inspiration" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <ImageIcon className="mr-2 text-rose-500" />
                Wedding Inspiration Board
              </h2>

              <form onSubmit={addInspiration} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <input
                  type="text"
                  required
                  placeholder="Title (e.g. Wedding Table Setup)"
                  value={inspTitle}
                  onChange={(e) => setInspTitle(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <input
                  type="text"
                  required
                  placeholder="Image URL"
                  value={inspUrl}
                  onChange={(e) => setInspUrl(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <button type="submit" className="rounded-lg bg-stone-900 text-white text-xs font-semibold dark:bg-rose-600">
                  Pin to Board
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {inspirations.map(insp => (
                  <div key={insp.id} className="rounded-xl overflow-hidden border shadow-sm group relative">
                    <img src={insp.url} alt={insp.title} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3 bg-white dark:bg-stone-900 border-t">
                      <p className="text-xs font-semibold text-stone-800 dark:text-stone-200">{insp.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: WEDDING CREW */}
          {activeTab === "crew" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <UserCheck className="mr-2 text-rose-500" />
                Wedding Crew Roles
              </h2>

              <form onSubmit={addCrew} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <input
                  type="text"
                  required
                  placeholder="Helper Name"
                  value={crewName}
                  onChange={(e) => setCrewName(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <select
                  value={crewRole}
                  onChange={(e) => setCrewRole(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                >
                  <option value="Maid of Honor">Maid of Honor</option>
                  <option value="Best Man">Best Man</option>
                  <option value="Bridesmaid">Bridesmaid</option>
                  <option value="Groomsman">Groomsman</option>
                  <option value="Wedding Coordinator Helper">Coordinator Helper</option>
                </select>
                <input
                  type="text"
                  required
                  placeholder="Assigned Task description"
                  value={crewTask}
                  onChange={(e) => setCrewTask(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <button type="submit" className="rounded-lg bg-stone-900 text-white text-xs font-semibold dark:bg-rose-600">
                  Appoint Crew
                </button>
              </form>

              <div className="space-y-3">
                {crew.map(c => (
                  <div key={c.id} className="p-3.5 rounded-xl border flex items-center justify-between bg-white dark:bg-stone-900">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-800 dark:text-stone-200">{c.name}</h4>
                      <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-400">{c.role}</span>
                      <p className="text-xs text-stone-500 mt-1">Role Task: {c.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: PHOTO GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <Camera className="mr-2 text-rose-500" />
                Wedding Day Photo Gallery
              </h2>

              <form onSubmit={addPhoto} className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border">
                <input
                  type="text"
                  required
                  placeholder="Paste Memory Image URL"
                  value={galleryUrl}
                  onChange={(e) => setGalleryUrl(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <input
                  type="text"
                  placeholder="Short Description (e.g. cutting the cake)"
                  value={galleryDesc}
                  onChange={(e) => setGalleryDesc(e.target.value)}
                  className="text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                />
                <button type="submit" className="rounded-lg bg-stone-900 text-white text-xs font-semibold dark:bg-rose-600">
                  Upload Photo
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map(img => (
                  <div key={img.id} className="rounded-xl overflow-hidden border shadow-sm group relative bg-stone-100 dark:bg-stone-950">
                    <img src={img.url} alt={img.desc} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <p className="text-xs font-medium">{img.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: PUBLIC SITE BUILDER */}
          {activeTab === "publicsite" && (
            <div className="space-y-6">
              <h2 className="font-serif font-bold text-2xl text-stone-800 dark:text-stone-100 flex items-center border-b pb-4">
                <Globe className="mr-2 text-rose-500" />
                Public Wedding Site Live Preview
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Editor Forms */}
                <form onSubmit={savePublicSite} className="p-4 bg-stone-50 dark:bg-stone-950/40 rounded-xl border space-y-3">
                  <h3 className="font-serif font-bold text-base text-stone-700 dark:text-stone-300">
                    Invitation Customizer
                  </h3>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Cursive Title</label>
                    <input
                      type="text"
                      value={editSiteTitle}
                      onChange={(e) => setEditSiteTitle(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Celebration Date</label>
                    <input
                      type="text"
                      value={editSiteDate}
                      onChange={(e) => setEditSiteDate(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Venue Coordinates</label>
                    <input
                      type="text"
                      value={editSiteVenue}
                      onChange={(e) => setEditSiteVenue(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider block mb-1">Our Story</label>
                    <textarea
                      rows={3}
                      value={editSiteStory}
                      onChange={(e) => setEditSiteStory(e.target.value)}
                      className="w-full text-xs rounded-lg border border-stone-200 px-3 py-2 bg-white dark:border-stone-800 dark:bg-stone-950"
                    />
                  </div>
                  <button type="submit" className="w-full rounded-lg bg-stone-900 text-white h-9 text-xs font-semibold dark:bg-rose-600">
                    Apply Customizations
                  </button>
                </form>

                {/* Real-time Render Invite Card */}
                <div className="rounded-2xl overflow-hidden border shadow-xl bg-amber-50/20 dark:bg-stone-950 space-y-4 pb-6">
                  <div className="relative h-44">
                    <img src={publicSite.banner} alt="invite" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center">
                      <h4 className="font-serif text-2xl font-bold text-white text-center tracking-wide">{publicSite.title}</h4>
                    </div>
                  </div>
                  <div className="px-6 text-center space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase font-bold tracking-wider text-rose-800 dark:text-rose-400">Join Us For Our Wedding Celebration</p>
                      <p className="font-serif text-lg font-bold text-stone-800 dark:text-stone-200">{publicSite.date}</p>
                    </div>
                    <div className="flex items-center justify-center space-x-1.5 text-xs text-stone-500 font-medium">
                      <MapPin className="h-3.5 w-3.5 text-rose-500" />
                      <span>{publicSite.venue}</span>
                    </div>
                    <p className="text-xs text-stone-500 font-light leading-relaxed max-w-sm mx-auto italic">
                      "{publicSite.story}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
