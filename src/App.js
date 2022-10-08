import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { v4 as uuidv4 } from "uuid";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const defaultProps = {
  className: "layout",
  rowHeight: 30,
  onLayoutChange: function () {},
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  resizeHandles: ["se"],
};

function generateLayout() {
  return [
    { w: 2, h: 3, x: 10, y: 9, i: "0", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 3, i: "1", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 6, i: "2", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 12, i: "3", moved: false, static: false },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 0,
      i: "7305f615-4324-4c3b-862c-1dbe12c92a7f",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 15,
      i: "d7af163d-9ddb-4246-a9f1-83169f69e2ba",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 2,
      x: 10,
      y: 18,
      i: "fa18447c-9e9a-4b47-89ae-7ecf7388cf13",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 1,
      x: 6,
      y: 0,
      i: "69cb6b6c-1f8b-4771-a48a-d90ef50dcd8f",
      moved: false,
      static: false,
      isDraggable: true,
    },
  ];

  return [1, 2, 3, 4].map(function (item, i) {
    var y = Math.ceil(Math.random() * 4) + 1;
    return {
      x: Math.round(Math.random() * 5) * 2,
      y: Math.floor(i / 6) * y,
      w: 2,
      h: y,
      i: i.toString(),
      static: Math.random() < 0.05,
    };
  });
}

const App = () => {
  const [state, setState] = useState({
    currentBreakpoint: "lg",
    compactType: "vertical",
    mounted: false,
    layouts: { lg: generateLayout() },
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  const generateDOM = () => {
    return state.layouts.lg.map(function (l, i) {
      return (
        <div
          key={l.i}
          className={
            l.static
              ? "static bg-red-500 rounded-md p-2"
              : "bg-red-500 rounded-md p-2"
          }
        >
          {/* {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )} */}

          <p class="text-[#067c7c] font-semibold uppercase">Unique views</p>
          <div class="flex justify-between space-x-4 ">
            <h3 class="text-base font-semibold">icon src</h3>
            <h3 class="text-3xl">987 views</h3>
          </div>
        </div>
      );
    });
  };

  const onBreakpointChange = (breakpoint) => {
    setState((prev) => ({
      ...prev,
      currentBreakpoint: breakpoint,
    }));
  };

  const onCompactTypeChange = () => {
    const { compactType: oldCompactType } = state;
    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setState((prev) => ({ ...prev, compactType }));
  };

  const onLayoutChange = (layout, layouts) => {
    console.log({ layout, layouts });
    if (layout.length > 0) {
      const updatedLayout = {
        layouts: { lg: layout },
      };
      setState((prev) => ({
        ...prev,
        updatedLayout,
      }));
    }
  };
  const onDragStop = (layout, layouts) => {
    const updatedLayout = {
      layouts: { lg: layout },
    };
    setState((prev) => ({
      ...prev,
      updatedLayout,
    }));
  };
  const onResizeStop = (layout, layouts) => {
    const updatedLayout = {
      layouts: { lg: layout },
    };
    setState((prev) => ({
      ...prev,
      updatedLayout,
    }));
  };

  const onNewLayout = () => {
    setState((prev) => ({
      ...prev,
      layouts: { lg: generateLayout() },
    }));
  };

  const onDrop = (layout, layoutItem, _event) => {
    setState((prev) => ({
      ...prev,
      layouts: {
        lg: layout,
      },
    }));
  };

  return (
    <div>
      <h1>{JSON.stringify(state.layouts.lg)}</h1>
      <div>
        Current Breakpoint: {state.currentBreakpoint} (
        {defaultProps.cols[state.currentBreakpoint]} columns)
      </div>
      <div className="text-2xl font-semibold">
        Compaction type: {state.compactType || "No Compaction"}
      </div>
      <button onClick={onNewLayout}>Generate New Layout</button>
      <button onClick={onCompactTypeChange}>Change Compaction Type</button>
      <div
        className="droppable-element"
        draggable={true}
        unselectable="on"
        // this is a hack for firefox
        // Firefox requires some kind of initialization
        // which we can do by adding this attribute
        // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>
      <ResponsiveReactGridLayout
        {...defaultProps}
        layouts={state.layouts}
        onBreakpointChange={onBreakpointChange}
        // onLayoutChange={onLayoutChange}
        onDragStop={onDragStop}
        onResizeStop={onResizeStop}
        onDrop={onDrop}
        // WidthProvider option
        measureBeforeMount={false}
        // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
        // and set `measureBeforeMount={true}`.
        useCSSTransforms={state.mounted}
        compactType={state.compactType}
        preventCollision={!state.compactType}
        isDroppable={true}
        droppingItem={{
          i: `${uuidv4()}`,
          w: 2,
          h: 1,
        }}
        margin={[10, 10]}
      >
        {generateDOM()}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default App;
