# Claude Code Session Notes - Wood 3D Toybox Project

## Project Overview
This is a 3D woodworking project for creating a toybox using tab-and-slot joinery system. The project includes multiple HTML files for 2D panel plans and manuals.

## Key Thai Terminology (CRITICAL - DO NOT CHANGE)
- **Tab** = "หัวต่อ" (connector/tab) - NO thickness specified in descriptions
- **Slot** = "ช่องต่อ" (connection slot) 
- **Tab & Slot System** = "ระบบหัวต่อ-ช่องต่อ"
- **Units**: Use ซม. (cm) instead of มม. (mm) - ALWAYS convert Russian мм to Thai ซม.
- **Slot (from edge)** = "รอยบาก" (slot made by notching from edge)  
- **Slot (in wood)** = "ช่องต่ออแบบเจาะรู" → simplified to "รูเจาะ" (slot made by drilling hole inside wood)
- **Corner cutting** = "รอยตัดมุม" (for rounded tab corners) - NOT "รอยบาก"

## File Structure & Purposes
- `panel_manual.html` - Main manual with standardized format for all 5 panels
- `toybox_plan_2d.html` - 2D planning interface
- `panel_2d_converter.html` - Panel conversion utilities
- Panel specifications: Top, Bottom, Left, Right, Back panels

## Standard Panel Manual Format (MUST FOLLOW)
Each panel section should have:

### Basic Details (detail-item):
- ขนาด: (dimensions in ซม.)
- วัสดุ: (material specification)  
- มุมโค้ง: รัศมี 1 ซม. ทุกมุม
- หัวต่อ/รอยบาก/รูเจาะ: (with reference to detailed section)

### Detailed Sections (holes-list):
- Use consistent naming: "หัวต่อ (X หัวต่อ)", "รอยบาก (X รอย)", "รูเจาะ (X รู)"
- Number items: "หัวต่อ 1:", "รู 1:", "รอยบาก 1:" etc.
- Include direction: "ด้านซ้าย", "ด้านขวา", "ด้านบน", "ด้านล่าง"
- Specify dimensions and positions clearly

### Assembly Instructions (joinery-info):
- Explain how each component connects to others
- Use consistent language about insertion directions

## Panel Specifications Reference
- **Top Panel**: 5 หัวต่อ (ซ้าย 2, ขวา 2, ล่าง 1)
- **Bottom Panel**: 5 หัวต่อ (ซ้าย 2, ขวา 2, บน 1) 
- **Left Panel**: รอยบาก ด้านซ้าย 2 จุด + รูเจาะ ด้านขวา 2 จุด + หัวต่อ ด้านล่าง 1 จุด
- **Right Panel**: รอยบาก ด้านขวา 2 จุด + รูเจาะ ด้านซ้าย 2 จุด + หัวต่อ ด้านล่าง 1 จุด  
- **Back Panel**: รูเจาะ รอบด้าน 4 จุด (ซ้าย, ขวา, ล่าง, บน)

## Critical Measurements
- Standard slot dimensions: 1×4 ซม. เจาะเข้าไป 1 ซม.
- Standard tab thickness: 1 ซม. (but don't specify thickness in หัวต่อ descriptions)
- Corner radius: รัศมี 1 ซม. ทุกมุม
- Back panel size: 42×41×1 ซม.
- Other panels: 40×20×1 ซม.

## Print Layout CSS (IMPORTANT)
```css
@media print {
    .panel-content { 
        display: block !important; 
        grid-template-columns: none !important; 
    }
    .panel-diagram { margin-bottom: 20px; }
    .page-break-after-details { page-break-before: always; }
}
```
- Single column layout for printing
- Page break after basic details, before detailed sections
- Keep related holes-list sections together on same page

## Common Issues & Solutions
1. **Russian мм units**: Always convert to Thai ซม. using sed commands
2. **Multiple holes-list**: First one gets `page-break-after-details` class, others don't
3. **Terminology consistency**: Never change agreed Thai terms, especially รอยตัดมุม vs รอยบาก
4. **Slot dimensions**: 1×4 ซม. is standard (not 1×2 ซม.)

## Session Context Pattern
User typically works on:
1. Terminology updates and corrections
2. Unit conversions (мм → ซม.)  
3. Format standardization across panels
4. Print layout adjustments
5. Adding missing specifications

## File Editing Approach
- Always read files before editing
- Use MultiEdit for multiple changes in same file
- Prefer Edit tool over Write for existing files
- Use sed for bulk find/replace of units or terminology
- Be careful with similar content across panels - provide unique context for edits

## Three.js Shape Creation with quadraticCurveTo (CRITICAL LESSONS)

### Creating Perfect Semi-Circles
**Key Principle**: ALWAYS fix start/end points first, then adjust angles only

#### Successful Semi-Circle Formula:
```javascript
// Fixed requirements (NEVER change these):
// - Start: (2, -1.5) 
// - End: (2, 1.5)
// - Center: (2, 0) for chair legs, (0.5, 0) for slots
// - Radius: 1.5 units (15cm)

// Working angle formula: -90° to -270°
for (let i = 0; i < 4; i++) {
    const angle1 = (-Math.PI/2) - (i * Math.PI) / 4; // -π/2 to -3π/2
    const angle2 = (-Math.PI/2) - ((i + 1) * Math.PI) / 4;
    
    const x2 = centerX + Math.cos(angle2) * radius;
    const y2 = 0 + Math.sin(angle2) * radius;
    
    const midAngle = (angle1 + angle2) / 2;
    const xControl = centerX + Math.cos(midAngle) * radius * 1.08;
    const yControl = 0 + Math.sin(midAngle) * radius * 1.08;
    
    shape.quadraticCurveTo(xControl, yControl, x2, y2);
}
```

#### Critical Rules:
1. **Never change start/end coordinates** - only adjust angles
2. **Test semi-circles separately** before applying to complex shapes
3. **Use consistent naming**: `centerX = 2` for chair, `centerX = 0.5` for slots
4. **Control point distance**: multiply by 1.08 for smooth curves
5. **Direction matters**: negative angles (-90° to -270°) for left-curving semicircles

### Chair Project Structure
- `chair_project/panel_all.html` - Main 3D viewer for chair components
- `chair_project/panel_all_script.js` - Contains shape creation functions
- Key functions: `createLeftLeg()`, `createRightLeg()`, `createSeatWithCurves()`
- Grid layout: 2x2 positioning for different chair components

### Mobile Responsiveness Implementation
- Added collapsible control panels for mobile devices
- Uses media queries @768px and @480px breakpoints  
- Toggle button functionality with backdrop-filter effects
- Responsive grid layouts and font sizing