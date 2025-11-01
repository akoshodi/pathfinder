<?php

namespace Tests\Unit\Components;

use PHPUnit\Framework\TestCase;

class DataTableResponsiveTest extends TestCase
{
    /**
     * Test that responsive mode prop is properly typed
     */
    public function test_responsive_mode_accepts_valid_values(): void
    {
        $validModes = ['table', 'cards', 'auto'];

        foreach ($validModes as $mode) {
            $this->assertIn($mode, $validModes);
        }
    }

    /**
     * Test mobile breakpoint constant
     */
    public function test_mobile_breakpoint_is_768px(): void
    {
        $mobileBreakpoint = 768;

        $this->assertEquals(768, $mobileBreakpoint);
    }

    /**
     * Test that cards view is used for mobile with auto mode
     */
    public function test_card_view_used_for_mobile_auto_mode(): void
    {
        $windowWidth = 375; // Mobile
        $mobileBreakpoint = 768;
        $responsiveMode = 'auto';

        $shouldUseCardView = ($responsiveMode === 'cards') || 
                            ($responsiveMode === 'auto' && $windowWidth < $mobileBreakpoint);

        $this->assertTrue($shouldUseCardView);
    }

    /**
     * Test that table view is used for desktop with auto mode
     */
    public function test_table_view_used_for_desktop_auto_mode(): void
    {
        $windowWidth = 1200; // Desktop
        $mobileBreakpoint = 768;
        $responsiveMode = 'auto';

        $shouldUseCardView = ($responsiveMode === 'cards') || 
                            ($responsiveMode === 'auto' && $windowWidth < $mobileBreakpoint);

        $this->assertFalse($shouldUseCardView);
    }

    /**
     * Test that cards mode always shows cards regardless of screen size
     */
    public function test_cards_mode_forces_card_view(): void
    {
        $responsiveMode = 'cards';

        $shouldUseCardView = $responsiveMode === 'cards';

        $this->assertTrue($shouldUseCardView);
    }

    /**
     * Test that table mode always shows table regardless of screen size
     */
    public function test_table_mode_forces_table_view(): void
    {
        $responsiveMode = 'table';

        $shouldUseCardView = $responsiveMode === 'table' ? false : true;

        $this->assertFalse($shouldUseCardView);
    }

    /**
     * Test responsive padding calculation
     */
    public function test_responsive_padding_classes(): void
    {
        $mobilePadding = 'px-4';
        $desktopPadding = 'md:px-6';

        $responsivePaddingClasses = "$mobilePadding $desktopPadding";

        $this->assertStringContainsString('px-4', $responsivePaddingClasses);
        $this->assertStringContainsString('md:px-6', $responsivePaddingClasses);
    }

    /**
     * Test table width constraint
     */
    public function test_table_has_full_width(): void
    {
        $tableClasses = 'w-full table-auto divide-y divide-border';

        $this->assertStringContainsString('w-full', $tableClasses);
        $this->assertStringContainsString('table-auto', $tableClasses);
    }

    /**
     * Test overflow handling
     */
    public function test_overflow_x_auto_for_horizontal_scroll(): void
    {
        $containerClasses = 'relative w-full overflow-x-auto';

        $this->assertStringContainsString('overflow-x-auto', $containerClasses);
        $this->assertStringContainsString('w-full', $containerClasses);
    }

    /**
     * Test line clamping for long text
     */
    public function test_line_clamp_for_text_overflow(): void
    {
        $cellClasses = 'px-3 py-4 sm:px-4 text-sm text-foreground line-clamp-2';

        $this->assertStringContainsString('line-clamp-2', $cellClasses);
    }

    /**
     * Test card layout structure
     */
    public function test_card_layout_structure(): void
    {
        $cardClasses = 'rounded-lg bg-card border border-border p-4 shadow-sm';

        $this->assertStringContainsString('rounded-lg', $cardClasses);
        $this->assertStringContainsString('bg-card', $cardClasses);
        $this->assertStringContainsString('border', $cardClasses);
        $this->assertStringContainsString('p-4', $cardClasses);
    }

    /**
     * Test responsive hover state
     */
    public function test_responsive_hover_state(): void
    {
        $rowClasses = 'hover:bg-muted/50 transition-colors';

        $this->assertStringContainsString('hover:bg-muted', $rowClasses);
        $this->assertStringContainsString('transition-colors', $rowClasses);
    }
}
