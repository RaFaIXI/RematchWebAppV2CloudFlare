"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Clipboard, Save, Undo, Download, ExternalLink, HomeIcon, Trash2, Edit3, X, ArrowRight, Type, MinusIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function TacticalBoardPage() {
  const [lang, setLang] = useState<"en" | "fr">("en");
  const [players, setPlayers] = useState<{ id: string; team: string; x: number; y: number; color: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedPlayer, setDraggedPlayer] = useState<string | null>(null);
  // Update history to store all elements (players, lines, and texts)
  const [history, setHistory] = useState<{
    players: { id: string; team: string; x: number; y: number; color: string }[];
    lines: Line[];
    texts: {id: string, text: string, x: number, y: number, color: string}[];
  }[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [currentLine, setCurrentLine] = useState<Line | null>(null);
  const [selectedLineColor, setSelectedLineColor] = useState("#ffffff");
  const [lineWidth, setLineWidth] = useState(3); 
  const [drawingTool, setDrawingTool] = useState<"freehand" | "line" | "arrow" | "text">("freehand");
  const [teamSize, setTeamSize] = useState<4 | 5>(5);
  const [startPoint, setStartPoint] = useState<{x: number, y: number} | null>(null);
  const [isTextMode, setIsTextMode] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [textPosition, setTextPosition] = useState<{x: number, y: number} | null>(null);
  const [texts, setTexts] = useState<{id: string, text: string, x: number, y: number, color: string}[]>([]);
  const [isPlacingText, setIsPlacingText] = useState(false);

  const fieldRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLInputElement>(null);
  const easterEggTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang === "en" || storedLang === "fr") {
      setLang(storedLang);
    }
    
    // Initialize players
    initializePlayers();

    return () => {
      if (easterEggTimerRef.current) {
        clearTimeout(easterEggTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Check for easter egg pattern after each move
    checkForEasterEgg();
  }, [players]);

  useEffect(() => {
    // Re-initialize players when team size changes
    initializePlayers();
  }, [teamSize]);

  const translations = {
    en: {
      title: "Tactical Board",
      subtitle: "Create and share your football strategies",
      reset: "Reset Board",
      undo: "Undo Last Move",
      downloadImage: "Download Image",
      backToHome: "Back to Home",
      teamA: "Team A",
      teamB: "Team B",
      easterEggMessage: "Cheeky! Keep it classy!",
      drawLines: "Draw Mode",
      exitDrawMode: "Exit Draw Mode",
      clearLines: "Clear",
      lineColor: "Line Color",
      lineWidth: "Line Width",
      format4v4: "4v4 Format",
      format5v5: "5v5 Format",
      drawingTools: "Drawing Tools",
      freehand: "Freehand",
      straightLine: "Straight Line",
      arrow: "Arrow",
      text: "Text",
      addText: "Add Text",
      enterText: "Enter text...",
      placeText: "Click on the field to place text"
    },
    fr: {
      title: "Tableau Tactique",
      subtitle: "Créez et partagez vos stratégies de football",
      reset: "Réinitialiser",
      undo: "Annuler",
      downloadImage: "Télécharger",
      backToHome: "Retour à l'Accueil",
      teamA: "Équipe A",
      teamB: "Équipe B",
      easterEggMessage: "Coquin! Restez classe!",
      drawLines: "Mode Dessin",
      exitDrawMode: "Quitter Mode Dessin",
      clearLines: "Effacer",
      lineColor: "Couleur",
      lineWidth: "Épaisseur",
      format4v4: "Format 4v4",
      format5v5: "Format 5v5",
      drawingTools: "Outils de Dessin",
      freehand: "Main Levée",
      straightLine: "Ligne Droite",
      arrow: "Flèche",
      text: "Texte",
      addText: "Ajouter Texte",
      enterText: "Entrez du texte...",
      placeText: "Cliquez sur le terrain pour placer le texte"
    }
  };

  const t = translations[lang];

  const initializePlayers = () => {
    let teamA, teamB;
    
    if (teamSize === 5) {
      // Team A (blue) - 5 players
      teamA = [
        { id: "a1", team: "a", x: 100, y: 200, color: "#3b82f6" },  // Left back
        { id: "a2", team: "a", x: 200, y: 120, color: "#3b82f6" },  // Left forward
        { id: "a3", team: "a", x: 150, y: 250, color: "#3b82f6" },  // Center back
        { id: "a4", team: "a", x: 200, y: 380, color: "#3b82f6" },  // Right forward
        { id: "a5", team: "a", x: 100, y: 300, color: "#3b82f6" },  // Right back
      ];
      
      // Team B (red) - 5 players
      teamB = [
        { id: "b1", team: "b", x: 500, y: 200, color: "#ef4444" },  // Left back
        { id: "b2", team: "b", x: 400, y: 120, color: "#ef4444" },  // Left forward
        { id: "b3", team: "b", x: 450, y: 250, color: "#ef4444" },  // Center back
        { id: "b4", team: "b", x: 400, y: 380, color: "#ef4444" },  // Right forward
        { id: "b5", team: "b", x: 500, y: 300, color: "#ef4444" },  // Right back
      ];
    } else {
      // Team A (blue) - 4 players
      teamA = [
        { id: "a1", team: "a", x: 100, y: 170, color: "#3b82f6" },  // Left back
        { id: "a2", team: "a", x: 200, y: 170, color: "#3b82f6" },  // Left forward
        { id: "a3", team: "a", x: 200, y: 330, color: "#3b82f6" },  // Right forward
        { id: "a4", team: "a", x: 100, y: 330, color: "#3b82f6" },  // Right back
      ];
      
      // Team B (red) - 4 players
      teamB = [
        { id: "b1", team: "b", x: 500, y: 170, color: "#ef4444" },  // Left back
        { id: "b2", team: "b", x: 400, y: 170, color: "#ef4444" },  // Left forward
        { id: "b3", team: "b", x: 400, y: 330, color: "#ef4444" },  // Right forward
        { id: "b4", team: "b", x: 500, y: 330, color: "#ef4444" },  // Right back
      ];
    }
    
    // Ball
    const ball = { id: "ball", team: "ball", x: 300, y: 250, color: "#ffffff" };
    
    const initialPlayers = [...teamA, ...teamB, ball];
    setPlayers(initialPlayers);
    // Update history to include all elements
    setHistory([{
      players: initialPlayers,
      lines: [],
      texts: []
    }]);
    setLines([]);
    setTexts([]);
  };

  // Handle player dragging
  interface Player {
    id: string;
    team: string;
    x: number;
    y: number;
    color: string;
  }

  type PointerEvent = React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>;

  const handlePlayerPointerDown = (playerId: string, e: PointerEvent): void => {
    if (!isDrawingMode) {
      e.stopPropagation(); // Prevent field's pointer down
      setIsDragging(true);
      setDraggedPlayer(playerId);
    }
  };

  // Handle field interactions for drawing lines
  interface LinePoint {
    x: number;
    y: number;
  }

  interface Line {
    id: string;
    points: LinePoint[];
    color: string;
    width: number;
    type: "freehand" | "line" | "arrow";
  }

  const handleFieldPointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>): void => {
    if (isDrawingMode) {
      const fieldRect = fieldRef.current?.getBoundingClientRect();
      if (!fieldRect) return;

      let x: number, y: number;
      
      // Handle both touch and mouse events
      if ('touches' in e) {
        x = e.touches[0].clientX - fieldRect.left;
        y = e.touches[0].clientY - fieldRect.top;
      } else {
        x = e.clientX - fieldRect.left;
        y = e.clientY - fieldRect.top;
      }
      
      if (drawingTool === "text") {
        // Place text at this position
        if (currentText.trim()) {
          const newText = {
            id: `text-${Date.now()}`,
            text: currentText,
            x,
            y,
            color: selectedLineColor
          };
          const updatedTexts = [...texts, newText];
          setTexts(updatedTexts);
          // Add to history when text is added
          setHistory([...history, {
            players: [...players],
            lines: [...lines],
            texts: updatedTexts
          }]);
          setCurrentText("");
          setIsPlacingText(false);
        }
        return;
      }
      
      if (drawingTool === "line" || drawingTool === "arrow") {
        // For straight lines and arrows, we track the start point
        setStartPoint({x, y});
        setIsDrawing(true);
        setCurrentLine({
          id: `line-${Date.now()}`,
          points: [{x, y}, {x, y}], // Start and initial end point (same)
          color: selectedLineColor,
          width: lineWidth,
          type: drawingTool
        });
      } else {
        // Freehand drawing
        setIsDrawing(true);
        setCurrentLine({
          id: `line-${Date.now()}`,
          points: [{ x, y }],
          color: selectedLineColor,
          width: lineWidth,
          type: "freehand"
        });
      }
    } else if (isPlacingText) {
      const fieldRect = fieldRef.current?.getBoundingClientRect();
      if (!fieldRect) return;

      let x: number, y: number;
      
      // Handle both touch and mouse events
      if ('touches' in e) {
        x = e.touches[0].clientX - fieldRect.left;
        y = e.touches[0].clientY - fieldRect.top;
      } else {
        x = e.clientX - fieldRect.left;
        y = e.clientY - fieldRect.top;
      }
      
      if (currentText.trim()) {
        const newText = {
          id: `text-${Date.now()}`,
          text: currentText,
          x,
          y,
          color: selectedLineColor
        };
        const updatedTexts = [...texts, newText];
        setTexts(updatedTexts);
        // Add to history when text is placed
        setHistory([...history, {
          players: [...players],
          lines: [...lines],
          texts: updatedTexts
        }]);
        setCurrentText("");
        setIsPlacingText(false);
      }
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && draggedPlayer) {
      // Normal dragging mode
      const fieldRect = fieldRef.current?.getBoundingClientRect();
      if (!fieldRect) return;
      let x, y;
      
      // Handle both touch and mouse events
      if ('touches' in e) {
        x = e.touches[0].clientX - fieldRect.left;
        y = e.touches[0].clientY - fieldRect.top;
      } else {
        x = e.clientX - fieldRect.left;
        y = e.clientY - fieldRect.top;
      }
      
      // Don't allow dragging outside the field
      const playerSize = draggedPlayer === "ball" ? 15 : 25;
      const boundedX = Math.max(playerSize, Math.min(fieldRect.width - playerSize, x));
      const boundedY = Math.max(playerSize, Math.min(fieldRect.height - playerSize, y));
      
      setPlayers(players.map(player => 
        player.id === draggedPlayer 
          ? { ...player, x: boundedX, y: boundedY } 
          : player
      ));
    } else if (isDrawingMode && isDrawing && currentLine) {
      const fieldRect = fieldRef.current?.getBoundingClientRect();
      if (!fieldRect) return;
      let x, y;
      
      // Handle both touch and mouse events
      if ('touches' in e) {
        x = e.touches[0].clientX - fieldRect.left;
        y = e.touches[0].clientY - fieldRect.top;
      } else {
        x = e.clientX - fieldRect.left;
        y = e.clientY - fieldRect.top;
      }

      if (drawingTool === "freehand") {
        // Drawing mode - add new point to current freehand line
        const lastPoint = currentLine.points[currentLine.points.length - 1];
        const dx = x - lastPoint.x;
        const dy = y - lastPoint.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 5) {
          setCurrentLine({
            ...currentLine,
            points: [...currentLine.points, {x, y}]
          });
        }
      } else if (drawingTool === "line" || drawingTool === "arrow") {
        // Update end point for straight line or arrow
        if (startPoint) {
          setCurrentLine({
            ...currentLine,
            points: [currentLine.points[0], {x, y}]
          });
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (isDragging) {
      // Update history with all current elements when a player is moved
      setHistory([...history, {
        players: [...players],
        lines: [...lines],
        texts: [...texts]
      }]);
      setIsDragging(false);
      setDraggedPlayer(null);
    } else if (isDrawingMode && isDrawing && currentLine) {
      // End the current line drawing
      if ((drawingTool === "freehand" && currentLine.points.length > 1) || 
          (drawingTool !== "freehand" && startPoint)) {
        const updatedLines = [...lines, currentLine];
        setLines(updatedLines);
        // Add to history when a drawing is completed
        setHistory([...history, {
          players: [...players],
          lines: updatedLines,
          texts: [...texts]
        }]);
      }
      setCurrentLine(null);
      setIsDrawing(false);
      setStartPoint(null);
    }
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode(!isDrawingMode);
    setCurrentLine(null);
    setIsDrawing(false);
    setStartPoint(null);
    setIsTextMode(false);
    setIsPlacingText(false);
  };

  const clearAllLines = () => {
    setLines([]);
    setTexts([]);
    setCurrentLine(null);
    setIsDrawing(false);
    setIsPlacingText(false);
    // Add to history when clearing all drawings
    setHistory([...history, {
      players: [...players],
      lines: [],
      texts: []
    }]);
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentText.trim()) {
      setIsPlacingText(true);
      if (textInputRef.current) {
        textInputRef.current.blur();  // Hide mobile keyboard
      }
    }
  };

  const checkForEasterEgg = () => {
    // First find all the available players (excluding the ball)
    const playersOnly = players.filter(p => p.id !== "ball");
    
    // We need to find a pattern where:
    // 1. Two players are positioned close to each other horizontally (the "balls")
    // 2. Three players are positioned in a vertical line above them (the "shaft")
    
    // Step 1: Find all potential pairs that could be the "balls"
    const potentialPairs = [];
    for (let i = 0; i < playersOnly.length; i++) {
      for (let j = i + 1; j < playersOnly.length; j++) {
        const p1 = playersOnly[i];
        const p2 = playersOnly[j];
        
        // Check if they're roughly at the same height (y value)
        if (Math.abs(p1.y - p2.y) < 30) {
          // Check if they're close horizontally but not too close
          const xDistance = Math.abs(p1.x - p2.x);
          if (xDistance > 20 && xDistance < 60) {
            potentialPairs.push([p1, p2]);
          }
        }
      }
    }
    
    // Step 2: For each potential pair, check if there are 3 players forming a vertical line above
    for (const pair of potentialPairs) {
      // Find the center point between the two "balls"
      const centerX = (pair[0].x + pair[1].x) / 2;
      const baseY = Math.min(pair[0].y, pair[1].y);
      
      // Find players that could form the "shaft"
      const shaftCandidates = playersOnly.filter(p => 
        !pair.includes(p) && // Not one of the "balls"
        Math.abs(p.x - centerX) < 30 && // Roughly aligned with the center of the "balls"
        p.y < baseY - 20 // Above the "balls"
      );
      
      // If we have at least 3 candidates for the shaft, sort them by Y position
      if (shaftCandidates.length >= 3) {
        shaftCandidates.sort((a, b) => b.y - a.y); // Sort by Y position (top to bottom)
        
        // Check if the top 3 form a reasonably straight line
        const shaft = shaftCandidates.slice(0, 3);
        let isAligned = true;
        
        for (let i = 0; i < shaft.length; i++) {
          if (Math.abs(shaft[i].x - centerX) > 30) {
            isAligned = false;
            break;
          }
          
          // If not the first element, check vertical spacing with previous
          if (i > 0) {
            const verticalSpacing = shaft[i-1].y - shaft[i].y;
            if (verticalSpacing < 20 || verticalSpacing > 80) {
              isAligned = false;
              break;
            }
          }
        }
        
        if (isAligned) {
          // Pattern detected! Trigger easter egg
          triggerEasterEgg();
          return;
        }
      }
    }
  };

  const triggerEasterEgg = () => {
    if (showEasterEgg) return; // Already showing
    
    setShowEasterEgg(true);
    
    // Hide the easter egg after a few seconds
    if (easterEggTimerRef.current) {
      clearTimeout(easterEggTimerRef.current);
    }
    
    easterEggTimerRef.current = setTimeout(() => {
      setShowEasterEgg(false);
    }, 3000);
  };

  const resetBoard = () => {
    initializePlayers();
    setShowEasterEgg(false);
    if (easterEggTimerRef.current) {
      clearTimeout(easterEggTimerRef.current);
    }
  };

  const undoLastMove = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      setHistory(newHistory);
      // Restore all elements from history
      const lastState = newHistory[newHistory.length - 1];
      setPlayers([...lastState.players]);
      setLines([...lastState.lines]);
      setTexts([...lastState.texts]);
    }
  };

  // Convert a line with points to an SVG path string
  interface Point {
    x: number;
    y: number;
  }

  const generateSvgPath = (points: Point[], type: string): string => {
    if (!points || points.length < 2) return "";
    
    if (type === "freehand") {
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        path += ` L ${points[i].x} ${points[i].y}`;
      }
      
      return path;
    } else if (type === "line") {
      return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
    } else if (type === "arrow") {
      const start = points[0];
      const end = points[1];
      
      // Calculate the angle
      const angle = Math.atan2(end.y - start.y, end.x - start.x);
      const arrowLength = 15; // Length of arrow head
      
      // Calculate the points of the arrow head
      const arrowPoint1 = {
        x: end.x - arrowLength * Math.cos(angle - Math.PI/6),
        y: end.y - arrowLength * Math.sin(angle - Math.PI/6)
      };
      
      const arrowPoint2 = {
        x: end.x - arrowLength * Math.cos(angle + Math.PI/6),
        y: end.y - arrowLength * Math.sin(angle + Math.PI/6)
      };
      
      return `M ${start.x} ${start.y} L ${end.x} ${end.y} M ${end.x} ${end.y} L ${arrowPoint1.x} ${arrowPoint1.y} M ${end.x} ${end.y} L ${arrowPoint2.x} ${arrowPoint2.y}`;
    }
    
    return "";
  };

  const downloadImage = () => {
    // Create a hidden canvas element
    const canvas = document.createElement('canvas');
    const field = fieldRef.current;
    if (!field) return;
    const rect = field.getBoundingClientRect();
    
    // Set canvas dimensions to match the field
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    
    // Draw the field background
    if (ctx) {
      ctx.fillStyle = '#16803c'; // Green field color
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    
    // Draw field markings
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    
    // Center circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 64, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Center line
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    
    // Center dot
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 2, 0, 2 * Math.PI);
    ctx.fill();
    
    // Goal areas
    ctx.strokeRect(0, (canvas.height / 2) - 64, 32, 128);
    ctx.strokeRect(canvas.width - 32, (canvas.height / 2) - 64, 32, 128);
    
    // Draw lines
    lines.forEach(line => {
      if (!line.points || line.points.length < 2) return;
      
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width || 3;
      ctx.beginPath();
      
      if (line.type === "freehand") {
        // Draw the line path
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (let i = 1; i < line.points.length; i++) {
          ctx.lineTo(line.points[i].x, line.points[i].y);
        }
      } else if (line.type === "line") {
        // Draw a straight line
        ctx.moveTo(line.points[0].x, line.points[0].y);
        ctx.lineTo(line.points[1].x, line.points[1].y);
      } else if (line.type === "arrow") {
        // Draw an arrow
        const start = line.points[0];
        const end = line.points[1];
        
        // Main line
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        
        // Arrow head
        const angle = Math.atan2(end.y - start.y, end.x - start.x);
        const arrowLength = 15;
        
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - arrowLength * Math.cos(angle - Math.PI/6),
          end.y - arrowLength * Math.sin(angle - Math.PI/6)
        );
        ctx.moveTo(end.x, end.y);
        ctx.lineTo(
          end.x - arrowLength * Math.cos(angle + Math.PI/6),
          end.y - arrowLength * Math.sin(angle + Math.PI/6)
        );
      }
      
      ctx.stroke();
    });
  }
    
    // Draw text elements
    texts.forEach(textItem => {
      if (ctx) {
        ctx.font = '16px Arial';
        ctx.fillStyle = textItem.color;
        ctx.textAlign = 'center';
        ctx.fillText(textItem.text, textItem.x, textItem.y);
      }
    });

    // Draw players and ball
    players.forEach(player => {
      if (player.id === "ball") {
        // Draw ball
        if (ctx) {
          ctx.fillStyle = player.color;
        
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 8, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      }
      } else {
        if (ctx) {

        // Draw player circle
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.arc(player.x, player.y, 12, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw player number
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(player.id.charAt(1), player.x, player.y);
      }}
      
    });
    
    // Convert canvas to data URL and trigger download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'tactical-board.png';
    link.href = dataUrl;
    link.click();
  };

  // Available line colors
  const lineColors = [
    { color: "#ffffff", name: lang === "en" ? "White" : "Blanc" },
    { color: "#3b82f6", name: lang === "en" ? "Blue" : "Bleu" },
    { color: "#ef4444", name: lang === "en" ? "Red" : "Rouge" },
    { color: "#10b981", name: lang === "en" ? "Green" : "Vert" },
    { color: "#f59e0b", name: lang === "en" ? "Orange" : "Orange" },
    { color: "#8b5cf6", name: lang === "en" ? "Purple" : "Violet" },
    { color: "#ec4899", name: lang === "en" ? "Pink" : "Rose" },
    { color: "#fbbf24", name: lang === "en" ? "Yellow" : "Jaune" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mt-2">{t.subtitle}</p>
          </div>
          <div className="flex space-x-4">
            <Link 
              href="/"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors duration-200"
            >
              <HomeIcon size={18} />
              <span>{t.backToHome}</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{lang === "en" ? "Controls" : "Contrôles"}</h2>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => setTeamSize(4)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                    teamSize === 4 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {t.format4v4}
                </button>
                <button 
                  onClick={() => setTeamSize(5)}
                  className={`flex-1 py-2 px-3 rounded-lg transition-colors ${
                    teamSize === 5 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {t.format5v5}
                </button>
              </div>
              
              <button 
                onClick={resetBoard}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Clipboard size={18} />
                <span>{t.reset}</span>
              </button>
              
              <button 
                onClick={undoLastMove}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
              >
                <Undo size={18} />
                <span>{t.undo}</span>
              </button>
              
              <button 
                onClick={downloadImage}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <Download size={18} />
                <span>{t.downloadImage}</span>
              </button>
              
              <button 
                onClick={toggleDrawingMode}
                className={`w-full flex items-center justify-center space-x-2 p-3 ${
                  isDrawingMode 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                } rounded-lg hover:bg-purple-500 hover:text-white dark:hover:bg-purple-700 transition-colors`}
              >
                {isDrawingMode ? <X size={18} /> : <Edit3 size={18} />}
                <span>{isDrawingMode ? t.exitDrawMode : t.drawLines}</span>
              </button>
              
              {(lines.length > 0 || texts.length > 0) && (
                <button 
                  onClick={clearAllLines}
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                >
                  <Trash2 size={18} />
                  <span>{t.clearLines}</span>
                </button>
              )}
            </div>
            
            {isDrawingMode && (
              <>
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t.drawingTools}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    <button
                      className={`p-2 rounded ${drawingTool === 'freehand' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      onClick={() => setDrawingTool('freehand')}
                      title={t.freehand}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${drawingTool === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      onClick={() => setDrawingTool('line')}
                      title={t.straightLine}
                    >
                      <MinusIcon size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${drawingTool === 'arrow' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      onClick={() => setDrawingTool('arrow')}
                      title={t.arrow}
                    >
                      <ArrowRight size={16} />
                    </button>
                    <button
                      className={`p-2 rounded ${drawingTool === 'text' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      onClick={() => setDrawingTool('text')}
                      title={t.text}
                    >
                      <Type size={16} />
                    </button>
                  </div>
                </div>
              
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t.lineColor}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {lineColors.map((colorOption) => (
                      <div
                        key={colorOption.color}
                        className={`h-8 rounded-md cursor-pointer border-2 ${
                          selectedLineColor === colorOption.color 
                            ? 'border-yellow-400 dark:border-yellow-500' 
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: colorOption.color }}
                        onClick={() => setSelectedLineColor(colorOption.color)}
                        title={colorOption.name}
                      ></div>
                    ))}
                  </div>
                </div>
              
                <div className="mt-4">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">{t.lineWidth}</h3>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={lineWidth} 
                    onChange={(e) => setLineWidth(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>1px</span>
                    <span>5px</span>
                    <span>10px</span>
                  </div>
                </div>
                
                {drawingTool === 'text' && (
                  <div className="mt-4">
                    <form onSubmit={handleTextSubmit}>
                      <div className="flex">
                        <input
                          ref={textInputRef}
                          type="text" 
                          value={currentText}
                          onChange={(e) => setCurrentText(e.target.value)}
                          placeholder={t.enterText}
                          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md dark:bg-gray-700"
                        />
                        <button 
                          type="submit"
                          className="bg-blue-500 text-white p-2 rounded-r-md"
                          disabled={!currentText.trim()}
                        >
                          {t.addText}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
            
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">{lang === "en" ? "Teams" : "Équipes"}</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t.teamA}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-gray-700 dark:text-gray-300">{t.teamB}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-white border border-gray-300 dark:border-gray-600"></div>
                  <span className="text-gray-700 dark:text-gray-300">{lang === "en" ? "Ball" : "Ballon"}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Tactical Board */}
          <div className="md:col-span-3">
            <div 
              ref={fieldRef}
              className={`bg-green-700 dark:bg-green-800 w-full h-[500px] rounded-xl shadow-md relative overflow-hidden ${
                isDrawingMode 
                  ? drawingTool === 'text' || isPlacingText 
                    ? 'cursor-text' 
                    : 'cursor-crosshair' 
                  : 'cursor-default'
              }`}
              onMouseDown={handleFieldPointerDown}
              onTouchStart={handleFieldPointerDown}
              onMouseMove={handlePointerMove}
              onTouchMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchEnd={handlePointerUp}
              onMouseLeave={handlePointerUp}
            >
              {/* Field markings */}
              <div className="absolute inset-0">
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white opacity-50 rounded-full"></div>
                
                {/* Center line */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-white opacity-50"></div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                
                {/* Team A goal area */}
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-16 h-32 border-2 border-white opacity-50"></div>
                
                {/* Team B goal area */}
                <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-16 h-32 border-2 border-white opacity-50"></div>
              </div>
              
              {/* Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {lines.map((line) => (
                  <path
                    key={line.id}
                    d={generateSvgPath(line.points, line.type)}
                    stroke={line.color}
                    strokeWidth={line.width || 3}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
                
                {/* Current drawing line */}
                {currentLine && currentLine.points && currentLine.points.length > 1 && (
                  <path
                    d={generateSvgPath(currentLine.points, currentLine.type)}
                    stroke={currentLine.color}
                    strokeWidth={currentLine.width || 3}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
              
              {/* Text elements */}
              {texts.map((textItem) => (
                <div 
                  key={textItem.id}
                  className="absolute pointer-events-none"
                  style={{
                    left: textItem.x,
                    top: textItem.y,
                    transform: 'translate(-50%, -50%)',
                    color: textItem.color,
                    textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
                  }}
                >
                  {textItem.text}
                </div>
              ))}
              
              {/* Players and ball */}
              {players.map((player) => (
                <div
                  key={player.id}
                  className={`absolute ${isDrawingMode ? '' : 'cursor-move'} ${player.id === "ball" ? "rounded-full border-2 border-gray-400 w-8 h-8 z-20" : "rounded-full w-12 h-12 flex items-center justify-center text-white font-bold z-10"}`}
                  style={{
                    backgroundColor: player.color,
                    left: player.x - (player.id === "ball" ? 4 : 6), // Center the player
                    top: player.y - (player.id === "ball" ? 4 : 6),
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    userSelect: 'none', // Prevent text selection
                    touchAction: 'none', // Prevent browser handling of touch events
                    pointerEvents: isDrawingMode ? 'none' : 'auto' // Allows drawing through players in drawing mode
                  }}
                  onMouseDown={(e) => handlePlayerPointerDown(player.id, e)}
                  onTouchStart={(e) => handlePlayerPointerDown(player.id, e)}
                >
                  {player.id !== "ball" && player.id.charAt(1)}
                </div>
              ))}
              
              {/* Text placement instructions */}
              {isPlacingText && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <div className="bg-black bg-opacity-70 text-white px-4 py-2 rounded-md">
                    {t.placeText}
                  </div>
                </div>
              )}
              
              {/* Easter Egg Animation with Image */}
              {showEasterEgg && (
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="bg-black bg-opacity-70 p-6 rounded-lg animate-bounce">
                    <p className="text-2xl text-white font-bold mb-4">{t.easterEggMessage}</p>
                    <div className="flex justify-center">
                      {/* Replace the emoji with the actual image */}
                      <div className="relative w-64 h-64">
                        <Image 
                          src="/images.png" 
                          alt="Easter Egg Image" 
                          layout="fill"
                          objectFit="contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
              {isDrawingMode 
                ? (drawingTool === 'text'
                    ? (lang === "en" ? "Enter text and click on the field to place it" : "Entrez du texte et cliquez sur le terrain pour le placer")
                    : (lang === "en" ? "Click and drag to draw" : "Cliquez et faites glisser pour dessiner"))
                : (lang === "en" 
                    ? "Drag players and ball to create your tactical setup" 
                    : "Faites glisser les joueurs et le ballon pour créer votre configuration tactique")
              }
            </div>
          </div>
        </div>

        <Footer />

      </div>
    </div>
  );}