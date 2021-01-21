/**
 * BLOCK: Image Comparison Slider Block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import { Icon } from "@wordpress/components";

import { useState, Fragment } from "@wordpress/element";
import {
  RichTextToolbarButton,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  registerFormatType,
  applyFormat,
  removeFormat,
} from "@wordpress/rich-text";
import {
  Popover,
  TextareaControl,
  ToggleControl,
  Button,
  PanelBody,
  PanelRow,
} from "@wordpress/components";

import ReactCompareImage from "react-compare-image";

const ALLOWED_MEDIA_TYPES = ["image"];

registerBlockType("image-comparison-slider-block/example", {
  // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
  title: __("Image Comparison Slider"), // Block title.
  icon: "shield", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
  category: "common", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
  keywords: [
    __("Example"),
    __("Decem Block"),
    __("Image Comparison Slider Block"),
  ],
  attributes: {
    imageLeftUrl: {
      type: "string",
      default: "",
    },
    imageLeftAlt: {
      type: "string",
      default: "",
    },
    imageRight: {
      type: "string",
      default: "",
    },
    imageRightAlt: {
      type: "string",
      default: "",
    },
  },

  /**
   * The edit function describes the structure of your block in the context of the editor.
   * This represents what the editor will render when the block is used.
   *
   * The "edit" property must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Component.
   */
  edit: ({ attributes, setAttributes, ...props }) => {

    const handleLeftImage = (image) => {
      setAttributes({
        imageLeftUrl: image.url,
        imageLeftAlt: image.alt,
      });
    };

    const handleRightImage = (image) => {
      setAttributes({
        imageRightUrl: image.url,
        imageRightAlt: image.alt,
      });
    };

    return [
      <InspectorControls key="1">
        <PanelBody title={__("Youtube Embed Block")}>
          <PanelRow>
            <div>
              {attributes.imageLeftUrl != "" &&  <img src={attributes.imageLeftUrl} />}
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(img) => handleLeftImage(img)}
                  allowedTypes={ALLOWED_MEDIA_TYPES}
                  render={({ open }) => (
                    <Button onClick={open} isPrimary>
                      {__("Add Left Image")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </PanelRow>
          <PanelRow>
            <div>
              {attributes.imageRightUrl != "" &&  <img src={attributes.imageRightUrl} />}
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={(img) => handleRightImage(img)}
                  allowedTypes={ALLOWED_MEDIA_TYPES}
                  render={({ open }) => (
                    <Button onClick={open} isPrimary>
                      {__("Add Right Image")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
            </div>
          </PanelRow>
        </PanelBody>
      </InspectorControls>,

      <div className={props.className} key="2">
        <ReactCompareImage
          leftImage={attributes.imageLeftUrl}
          rightImage={attributes.imageRightUrl}
        />
      </div>,
    ];
  },

  /**
   * The save function defines the way in which the different attributes should be combined
   * into the final markup, which is then serialized by Gutenberg into post_content.
   *
   * The "save" property must be specified and must be a valid function.
   *
   * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
   *
   * @param {Object} props Props.
   * @returns {Mixed} JSX Frontend HTML.
   */
  save: ({attributes, ...props}) => {
    console.log(attributes);
    let {imageLeftUrl, imageLeftAlt, imageRightUrl, imageRightAlt} = props
    return (
      <div className={props.className} key='2'>
        <div className="b-dics">
          <img src={attributes.imageLeftUrl} alt={attributes.imageLeftAlt} />
          <img src={attributes.imageRightUrl} alt={attributes.imageRightAlt}/>
        </div>
      </div>
    );
  },
});
