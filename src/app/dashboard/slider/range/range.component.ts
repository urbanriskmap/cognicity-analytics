import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss']
})
export class RangeComponent implements OnInit {
  @Input() rangeSettings: {
    totalDays: number,
    intervalHours: number
  };
  @Input() markings: {
    timestamp: any,
    mark: string
  }[];
  @Input() knobStep: {knobUpper: number, knobLower: number};

  halfKnobHt: number;
  totalSteps: number;
  sliderTopOffset: number;
  sliderHeightPx: number;
  rangeStepPx: number;
  isMobile: boolean;
  isSliderActive: boolean;
  selectedKnobId: string;
  dragPosition: number;

  @Output() rangeChanged = new EventEmitter();

  constructor() {
  }

  setRangeUnits() {
    const clearRangeHt = $('#sliderWrapper').height() - (2 * $('#startDateWrapper').height());

    $('#rangeWrapper').height(
      (clearRangeHt) - (clearRangeHt % this.totalSteps)
    );
    this.sliderHeightPx = $('#rangeWrapper').height();

    // Pixels represented by each step, given step size in hours
    this.rangeStepPx = this.sliderHeightPx / this.totalSteps;
    if ($('#rangeBase').offset()) {
      this.sliderTopOffset = $('#rangeBase').offset().top;
    }
  }

  ngOnInit() {
    this.totalSteps = this.rangeSettings.totalDays * (24 / this.rangeSettings.intervalHours);
    this.halfKnobHt = $('#knobUpper').height() / 2;

    // Bind screen pixel values to slider units
    this.setRangeUnits();
    $(window).resize(() => this.setRangeUnits());

    $(document).on('mousemove', (event) => {
      this.dragStart(event);
    });

    $(document).on('mouseup', () => {
      this.dragEnd();
    });
  }

  dragDirectionCheck(knob, position, direction) {
    switch (knob) {
      case 'knobUpper': switch (position) {
        case 'extreme': switch (direction) {
          case 1:
            return true;
          case -1:
            return false;
        }
        break;
        case 'crossing': switch (direction) {
          case 1:
            return false;
          case -1:
            return true;
        }
      }
      break;
      case 'knobLower': switch (position) {
        case 'extreme': switch (direction) {
          case 1:
            return false;
          case -1:
            return true;
        }
        break;
        case 'crossing': switch (direction) {
          case 1:
            return true;
          case -1:
            return false;
        }
      }
    }
  }

  touchStart(event) {
    this.isSliderActive = true;
    this.selectedKnobId = event.srcElement.id;
  }

  dragStart(event) {
    if (this.isSliderActive) {
      // Get current mouse Y position
      this.dragPosition = event.clientY;

      // Calculate drag distance
      const dragDistancePx = (this.dragPosition - this.sliderTopOffset)
        - (this.knobStep[this.selectedKnobId] * this.rangeStepPx);
      const stepChange = dragDistancePx / Math.abs(dragDistancePx);

      // Check slide conditions
      const thresholdCrossed = Math.abs(dragDistancePx) > (this.rangeStepPx / 2);

      let limitsChecked = (this.knobStep.knobUpper >= 0)
        && (this.knobStep.knobLower <= this.totalSteps);
      if (this.selectedKnobId === 'knobUpper' && this.knobStep.knobUpper === 0) {
        limitsChecked = this.dragDirectionCheck('knobUpper', 'extreme', stepChange);
      } else if (this.selectedKnobId === 'knobLower' && this.knobStep.knobLower === this.totalSteps) {
        limitsChecked = this.dragDirectionCheck('knobLower', 'extreme', stepChange);
      }

      let crossingChecked = (this.knobStep.knobLower - this.knobStep.knobUpper) >= 1;
      if ((this.knobStep.knobLower - this.knobStep.knobUpper) === 1) {
        crossingChecked = this.dragDirectionCheck(this.selectedKnobId, 'crossing', stepChange);
      }

      // Update values & UI
      if (thresholdCrossed && limitsChecked && crossingChecked) {
        this.knobStep[this.selectedKnobId] += stepChange;

        const newPositionPx = this.knobStep[this.selectedKnobId] * this.rangeStepPx;

        if (this.selectedKnobId === 'knobUpper') {
          $('#' + this.selectedKnobId).css({
            top: (newPositionPx - this.halfKnobHt) + 'px'
          });
          $('#' + this.selectedKnobId + 'Hover').css({
            top: (newPositionPx - this.halfKnobHt) + 'px'
          });
          $('#rangeFill').css({
            'margin-top': (newPositionPx - this.halfKnobHt) + 'px',
            'height': ((this.knobStep.knobLower - this.knobStep.knobUpper) * this.rangeStepPx) + 'px'
          });
        } else if (this.selectedKnobId === 'knobLower') {
          $('#' + this.selectedKnobId).css({
            bottom: (this.sliderHeightPx - newPositionPx - this.halfKnobHt) + 'px'
          });
          $('#' + this.selectedKnobId + 'Hover').css({
            bottom: (this.sliderHeightPx - newPositionPx - this.halfKnobHt) + 'px'
          });
          $('#rangeFill').css({
            'height': ((this.knobStep.knobLower - this.knobStep.knobUpper) * this.rangeStepPx) + 'px'
          });
        }
      }
    }
  }

  dragEnd() {
    if (this.isSliderActive) {
      this.isSliderActive = false;
      // Pass data to parent components
      this.rangeChanged.emit({
        upper: this.markings[this.knobStep.knobUpper],
        lower: this.markings[this.knobStep.knobLower]
      });
    }
  }
}
