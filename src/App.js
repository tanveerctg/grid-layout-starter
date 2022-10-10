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
    { w: 2, h: 3, x: 10, y: 0, i: "0", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 3, i: "1", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 6, i: "2", moved: false, static: false },
    { w: 2, h: 3, x: 10, y: 12, i: "3", moved: false, static: false },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 15,
      i: "4",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 18,
      i: "5",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 21,
      i: "6",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 24,
      i: "7",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 27,
      i: "8",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 30,
      i: "9",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 33,
      i: "10",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 36,
      i: "11",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 39,
      i: "12",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 42,
      i: "13",
      moved: false,
      static: false,
      isDraggable: true,
    },
    {
      w: 2,
      h: 3,
      x: 10,
      y: 45,
      i: "14",
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

          <p className="text-[#067c7c] font-semibold uppercase drag-handle">
            Unique views
          </p>

          <div className="flex justify-between space-x-4 ">
            <h3 className="text-base font-semibold">icon src</h3>
            <h3 className="text-3xl">987 views</h3>
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
  useEffect(() => {
    console.log({ lg: state.layouts.lg });
  }, [state.layouts.lg]);

  const onLayoutChange = (layout, layouts) => {
    console.log({ layout, layouts });

    const updatedLayout = {
      layouts: { lg: layout },
    };
    setState((prev) => ({
      ...prev,
      ...updatedLayout,
    }));
  };
  const onDragStop = (layout, layouts) => {
    // const updatedLayout = {
    //   layouts: { lg: layout },
    // };
    // console.log({ layouts });
    // setState((prev) => ({
    //   ...prev,
    //   updatedLayout,
    // }));
  };
  const onResizeStop = (layout, layouts) => {
    // const updatedLayout = {
    //   layouts: { lg: layout },
    // };
    // setState((prev) => ({
    //   ...prev,
    //   updatedLayout,
    // }));
  };

  const onNewLayout = () => {
    setState((prev) => ({
      ...prev,
      layouts: { lg: generateLayout() },
    }));
  };

  const onDrop = (layout, layoutItem, _event) => {
    // setState((prev) => ({
    //   ...prev,
    //   layouts: {
    //     lg: layout,
    //   },
    // }));
  };

  return (
    <div>
      <h2>{JSON.stringify(state.layouts.lg)}</h2>
      {/* <div>
        Current Breakpoint: {state.currentBreakpoint} (
        {defaultProps.cols[state.currentBreakpoint]} columns)
      </div>
      <div className="text-2xl font-semibold">
        Compaction type: {state.compactType || "No Compaction"}
      </div> */}
      {/* <button onClick={onNewLayout}>Generate New Layout</button> */}
      {/* <button onClick={onCompactTypeChange}>Change Compaction Type</button> */}
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
      <div style={{ background: "red", height: "1122.519685px" }}>
        <ResponsiveReactGridLayout
          {...defaultProps}
          layouts={state.layouts}
          onBreakpointChange={onBreakpointChange}
          onLayoutChange={onLayoutChange}
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
            h: 2,
          }}
          margin={[10, 10]}
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    </div>
  );
};

export default App;
