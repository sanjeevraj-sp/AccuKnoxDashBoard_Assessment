import {  createSlice } from '@reduxjs/toolkit';

const initialData = {
  categories: [
    {
      name: "CSPM Executive Dashboard",
      nickName : "CSPM",
      widgets: [
        { id: 1, name: "Cloud Accounts", text: "No Graph data available!" , visible : true},
        { id: 2, name: "Cloud Account Risk Assessment", text: "No Graph data available!" , visible : true}
      ]
    },
    {
      name: "CWPP Dashboard",
      nickName : "CWPP",
      widgets: [
        { id: 3, name: "Top 5 Namespace Specific Alerts", text: "No Graph data available!" , visible : true},
        { id: 4, name: "Workload Alerts", text: "No Graph data available!" , visible : true }
      ]
    },
    {
        name: "Registery Scan",
        nickName : "RS",
        widgets: [
          { id: 5, name: "Image Risk Assessment", text: "No Graph data available!" , visible : true},
          { id: 6, name: "Image Security Issues", text: "No Graph data available!" , visible : true }
        ]
      }
  ]
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState: initialData,
  reducers: {
    addWidget: (state, action) => {
      const { categoryName, widgetName, widgetText } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets.push({
          id: Date.now(),
          name: widgetName,
          text: widgetText,
          visible: true
        });
      }
    },
    removeWidget: (state, action) => {
      const { categoryName, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
      }
    },
    changeVisibility: (state, action) => {
        const { categoryName, widgetName } = action.payload;
        const category = state.categories.find(cat => cat.name === categoryName);
        if (category) {
            const widget = category.widgets.find(wid => wid.name === widgetName);
            if (widget) {
                widget.visible = !widget.visible;
            } else {
                console.warn(`Widget with name ${widgetName} not found in category ${categoryName}`);
            }
        } else {
            console.warn(`Category with name ${categoryName} not found`);
        }
    }
  }
});

export const { addWidget, removeWidget,changeVisibility } = widgetSlice.actions;
export default widgetSlice.reducer;

