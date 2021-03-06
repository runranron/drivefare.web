import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faSave } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Col,
  Row,
  Label,
  Input,
  EditOptionContainer,
  ModificationFormGroup,
  ModificationInputGroup,
  TouchableHighlight,
} from "../../styles";
import { colors } from "../../../constants/theme";
import { editModification, addModification } from "../../../actions/menu";

const INITAL_STATE = {
  name: "",
  options: [],
  type: "single",
  defaultOptionIndex: null,
};
class EditModification extends Component {
  state = INITAL_STATE;

  componentDidMount() {
    if (this.props.modification) {
      this.setState({
        ...this.props.modification,
      });
    } else {
      this.addOption();
    }
  }

  componentDidUpdate(prevProps) {
    const oldMod = prevProps.modification;
    const newMod = this.props.modification;
    if (newMod && (!oldMod || newMod._id !== oldMod._id)) {
      this.setState({
        ...this.props.modification,
      });
    } else if (!newMod && oldMod) {
      this.setState({...INITAL_STATE});
    }
  }

  handleModificationChange(name, value) {
    this.setState({
      [name]: value,
    });
  }

  handleOptionChange(optionIndex, name, value) {
    const options = [...this.state.options];
    const updatedOption = { ...options[optionIndex] };
    updatedOption[name] = value;
    options.splice(optionIndex, 1, updatedOption);
    this.handleModificationChange("options", options);
  }

  addOption() {
    const options = [...this.state.options, { name: "", price: "" }];
    this.setState({ options });
  }

  saveModification() {
    const existingMod = this.props.modification;
    const { name, options, type, defaultOptionIndex } = this.state;
    if (existingMod) {
      this.props.editModification(existingMod._id, {
        name,
        options,
        type,
        defaultOptionIndex,
      });
    }
    else this.props.addModification({ name, options, type, defaultOptionIndex });
  }

  render() {
    const { name, options, type, defaultOptionIndex } = this.state;
    return (
      <ModificationFormGroup>
        <Row>{this.props.modification ? "Edit" : "New"} Modification</Row>
        <Row>
          <ModificationInputGroup>
            <Label to="name">Name</Label>
            <Input
              name="name"
              value={name}
              onChange={(e) =>
                this.handleModificationChange(e.target.name, e.target.value)
              }
            />
          </ModificationInputGroup>
        </Row>
        <Row>
          <Button
            
            active={type === "single"}
            title="Single"
            onClick={(e) => this.handleModificationChange("type", "single", e)}
          />
          <Button
            
            active={type === "multiple"}
            title="Multiple"
            onClick={(e) =>
              this.handleModificationChange("type", "multiple", e)
            }
          />
        </Row>
        <Row>Options</Row>
        <Row>(click to select default)</Row>
        <Row>
          {options.map((option, optionIndex) => {
            return (
              <EditOptionContainer
                selected={defaultOptionIndex === optionIndex}
                onClick={(e) =>
                  this.handleModificationChange(
                    "defaultOptionIndex",
                    defaultOptionIndex === optionIndex ? null : optionIndex
                  )
                }
              >
                <Col>
                  <Input
                    name="name"
                    placeholder="Name"
                    value={option.name}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      this.handleOptionChange(
                        optionIndex,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </Col>
                <Col>
                  <Input
                    name="price"
                    placeholder="Price"
                    value={option.price}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      this.handleOptionChange(
                        optionIndex,
                        e.target.name,
                        e.target.value
                      )
                    }
                  />
                </Col>
              </EditOptionContainer>
            );
          })}
        </Row>
        <Row>
          <Col>
            <TouchableHighlight onClick={() => this.addOption()}>
              <FontAwesomeIcon icon={faPlusCircle} color={colors.primary100} /> New
              Option
            </TouchableHighlight>
          </Col>
        </Row>
        <Row>
          <Col>
            <TouchableHighlight onClick={() => this.saveModification()}>
              <FontAwesomeIcon icon={faSave} color={colors.primary100} /> Save
            </TouchableHighlight>
          </Col>
        </Row>
      </ModificationFormGroup>
    );
  }
}

const mapStateToProps = (state) => ({
  modifications: state.menu.modifications,
});

const mapDispatchToProps = {
  editModification,
  addModification,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModification);
