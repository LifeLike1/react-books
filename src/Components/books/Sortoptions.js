import {
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
} from "@material-ui/core";
import "./Sidebar.scss";

function Sortoptions({ handleSortChange, sortedValue }) {
  return (
    <div className="sidebar__sort">
      <h3>Posortuj według</h3>
      <FormControl>
        <InputLabel htmlFor="group-books"></InputLabel>
        <Select
          defaultValue={0}
          id="group-books"
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortedValue}
        >
          <MenuItem value={0}>
            <em>Domyślnie</em>
          </MenuItem>
          <ListSubheader>Oceny</ListSubheader>
          <MenuItem value={1}>Oceny rosnąco</MenuItem>
          <MenuItem value={2}>Oceny malejąco</MenuItem>
          <ListSubheader>Alfabetycznie</ListSubheader>
          <MenuItem value={3}>Tytuł od A do Z</MenuItem>
          <MenuItem value={4}>Tytuł od Z do A</MenuItem>
          <ListSubheader>Daty</ListSubheader>
          <MenuItem value={5}>Data od najnowszych</MenuItem>
          <MenuItem value={6}>Data od najstarszych</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Sortoptions;
